const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const assert = require('node:assert/strict');
const root = process.cwd();
const modules = new Map();
function load(file) {
  if (modules.has(file)) return modules.get(file).exports;
  const mod = { exports: {} }; modules.set(file, mod);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  function localRequire(name) {
    if (name.startsWith('@/')) return load(path.join(root, 'src', name.slice(2)) + '.ts');
    return require(name);
  }
  vm.runInThisContext('(function(require,module,exports){' + code + '\n})', { filename: file })(localRequire, mod, mod.exports);
  return mod.exports;
}
async function main() {
  const { calculateQuote } = load(path.join(root, 'src/lib/utils/quoteCalculator.ts'));
  const { tours } = load(path.join(root, 'src/lib/data/tours.ts'));
  const { vehicles } = load(path.join(root, 'src/lib/data/fleet.ts'));
  const requestRoute = load(path.join(root, 'src/app/api/requests/route.ts'));
  const emailRoute = load(path.join(root, 'src/app/api/email/route.ts'));
  const mapsRoute = load(path.join(root, 'src/app/api/maps/route.ts'));
  const post = (route, body) => route.POST(new Request('http://localhost/api/test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) }));
  const keys = ['SENDGRID_API_KEY','MAIL_FROM','BOOKING_EMAIL','GOOGLE_MAPS_SERVER_KEY'];
  const old = Object.fromEntries(keys.map(key => [key, process.env[key]])); const originalFetch = global.fetch;
  let checks = 0; let outbound;
  async function check(label, fn) { await fn(); checks++; console.log('PASS ' + label); }
  const contact = { type: 'contact', name: '<b>Test</b>', email: 'customer@example.com', phone: '3055550100', message: '<img src=x onerror=alert(1)>' };
  const booking = { type: 'booking', name: 'Test Customer', email: 'customer@example.com', phone: '3055550100', vehicleId: 'escalade-suv', serviceType: 'transfer', pickup: 'Miami Airport', dropoff: 'Miami Beach', date: '2099-12-01', time: '14:00', requests: '' };
  const quote = { quoteId: 'LRE-TEST', vehicleName: 'Escalade', origin: '<b>Airport</b>', destination: 'Miami Beach', distanceMiles: 15, durationHours: 3, validUntil: '2099-12-01T00:00:00.000Z', breakdown: [{ label: '<b>Total</b>', amount: 385.2, type: 'total' }] };
  try {
    await check('all vehicle quotes match published fleet rates', async()=>{
      for (const vehicle of vehicles) {
        const quote=calculateQuote({vehicleId:vehicle.id,serviceType:'hourly',origin:'Miami',destination:'Miami Beach',distanceMiles:vehicle.freeMiles+10,durationHours:3,date:new Date('2099-12-01T12:00:00Z'),passengerCount:1,isAirportTransfer:false},vehicle.name);
        assert.equal(quote.baseRate,vehicle.hourlyRate*3,vehicle.id);
        assert.equal(quote.distanceSurcharge,vehicle.perMileRate*10,vehicle.id);
      }
    });
    await check('all packages exclude separately paid activities',async()=>{
      for(const tour of tours) {
        assert.ok(tour.longDescription.includes('paid separately'),tour.id);
        assert.deepEqual(tour.includes,['Luxury vehicle for the reserved time package','Professional chauffeur','Pickup and drop-off within the agreed itinerary']);
      }
    });
    keys.forEach(key => delete process.env[key]);
    await check('malformed request rejected', async()=>assert.equal((await post(requestRoute, '{')).status,400));
    await check('empty request rejected', async()=>assert.equal((await post(requestRoute, {})).status,400));
    await check('missing configuration never reports success', async()=>assert.equal((await post(requestRoute, contact)).status,503));
    await check('missing maps key does not fabricate a distance', async()=>{const r=await post(mapsRoute,{origin:'Miami',destination:'Orlando'});assert.equal(r.status,503);assert.equal((await r.json()).distanceMiles,undefined);});
    process.env.SENDGRID_API_KEY='test-only'; process.env.MAIL_FROM='sender@example.com'; process.env.BOOKING_EMAIL='business@example.com';
    global.fetch=async (url,options)=>{outbound=JSON.parse(options.body);return new Response(null,{status:202});};
    await check('contact reaches business inbox with reply-to and escaped HTML',async()=>{assert.equal((await post(requestRoute,contact)).status,200);assert.equal(outbound.personalizations[0].to[0].email,'business@example.com');assert.equal(outbound.reply_to.email,contact.email);assert.ok(outbound.content[0].value.includes('&lt;img'));assert.ok(!outbound.content[0].value.includes('<img'));});
    await check('valid booking request accepted',async()=>assert.equal((await post(requestRoute,booking)).status,200));
    await check('unknown vehicle rejected',async()=>assert.equal((await post(requestRoute,{...booking,vehicleId:'fake'})).status,400));
    await check('past booking rejected',async()=>assert.equal((await post(requestRoute,{...booking,date:'2000-01-01'})).status,400));
    await check('invalid email rejected',async()=>assert.equal((await post(requestRoute,{...contact,email:'invalid'})).status,400));
    const tour={type:'tour',tourId:'miami-city',persons:2,date:'2099-12-01',name:'Test',email:'customer@example.com'};
    await check('valid tour accepted',async()=>assert.equal((await post(requestRoute,tour)).status,200));
    await check('tour price is flat for every valid group size',async()=>{
      await post(requestRoute,{...tour,persons:2});const small=outbound.content[0].value;
      await post(requestRoute,{...tour,persons:10});const large=outbound.content[0].value;
      assert.ok(small.includes('$399.00'));assert.ok(large.includes('$399.00'));assert.ok(large.includes('paid separately'));
    });
    await check('invalid tour group size rejected',async()=>assert.equal((await post(requestRoute,{...tour,persons:999})).status,400));
    await check('JSON quote dates reconstructed and HTML escaped',async()=>{assert.equal((await post(emailRoute,{to:'customer@example.com',quote})).status,200);assert.ok(outbound.content[0].value.includes('&lt;b&gt;Airport'));});
    global.fetch=async()=>new Response(null,{status:403});
    await check('provider failures return an error for requests',async()=>assert.equal((await post(requestRoute,contact)).status,502));
    await check('provider failures return an error for quotes',async()=>assert.equal((await post(emailRoute,{to:'customer@example.com',quote})).status,502));
    global.fetch=async()=>{throw new Error('network unavailable');};
    await check('network failures never report success',async()=>assert.equal((await post(requestRoute,contact)).status,502));
    console.log(checks + ' checks passed; no real emails sent.');
  } finally {
    global.fetch=originalFetch; for(const key of keys) { if(old[key]===undefined)delete process.env[key];else process.env[key]=old[key]; }
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
