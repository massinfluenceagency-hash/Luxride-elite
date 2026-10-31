const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const assert = require('node:assert/strict');
const root = process.cwd();
const modules = new Map();
const smtpState = { options: null, send: async()=>{throw new Error("SMTP test not configured");} };
function load(file) {
  if (modules.has(file)) return modules.get(file).exports;
  const mod = { exports: {} }; modules.set(file, mod);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  function localRequire(name) {
    if(name === "nodemailer") return { createTransport(options) { smtpState.options=options; return {sendMail:message=>smtpState.send(message),close() {}}; } };
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
  const keys = ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASSWORD','MAIL_FROM','BOOKING_EMAIL','GEOAPIFY_API_KEY','Geoapify'];
  const old = Object.fromEntries(keys.map(key => [key, process.env[key]])); const originalFetch = global.fetch;
  let checks = 0; let outbound;
  async function check(label, fn) { await fn(); checks++; console.log('PASS ' + label); }
  const contact = { type: 'contact', name: '<b>Test</b>', email: 'customer@example.com', phone: '3055550100', message: '<img src=x onerror=alert(1)>' };
  const booking = { type: 'booking', name: 'Test Customer', email: 'customer@example.com', phone: '3055550100', vehicleId: 'escalade-suv', serviceType: 'transfer', pickup: 'Miami Airport', dropoff: 'Miami Beach', date: '2099-12-01', time: '14:00', requests: '', durationHours: 3, passengerCount: 2 };
  const quote = { quoteId: 'LRE-TEST', vehicleName: 'Escalade', origin: '<b>Airport</b>', destination: 'Miami Beach', distanceMiles: 15, durationHours: 3, validUntil: '2099-12-01T00:00:00.000Z', breakdown: [{ label: '<b>Total</b>', amount: 385.2, type: 'total' }] };
  try {
    await check('all vehicle quotes match published fleet rates', async()=>{
      for (const vehicle of vehicles.filter(v=>v.chauffeurAvailable)) {
        const quote=calculateQuote({vehicleId:vehicle.id,serviceType:'hourly',origin:'Miami',destination:'Miami Beach',distanceMiles:vehicle.freeMiles+10,durationHours:3,date:new Date('2099-12-01T12:00:00Z'),passengerCount:1,isAirportTransfer:false},vehicle.name);
        assert.equal(quote.baseRate,vehicle.hourlyRate*3,vehicle.id);
        assert.equal(quote.distanceSurcharge,vehicle.perMileRate*10,vehicle.id);
      }
    });
    await check('confirmed 17 daily prices and no stock inventory photos',async()=>{
      assert.equal(vehicles.length,17);
      const expected={'mercedes-gle':400,'ferrari-f8':1500,'lamborghini-urus':1000,'mercedes-s580':500,'mercedes-g-wagon':700,'mercedes-gt':500,'maybach-gls':800,'bmw-760':450,'bentley-bentayga':600,'rolls-royce-dawn':1000,'rolls-royce-cullinan':1200,'porsche-cayenne':500,'corvette-c8':400,'suburban-suv':400,'escalade-suv':600,'tesla-cybertruck':350,'hummer-ev':400};
      for(const v of vehicles){assert.equal(v.dailyRate,expected[v.id],v.id);assert.ok(!v.image||v.image.startsWith('/images/fleet/real/'));}
      assert.throws(()=>calculateQuote({...booking,vehicleId:'ferrari-f8'},'F8'));
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
    process.env.SMTP_USER='sender@example.com'; process.env.SMTP_PASSWORD='test-only'; process.env.MAIL_FROM='sender@example.com'; process.env.BOOKING_EMAIL='business@example.com';
    smtpState.send=async message=>{outbound=message;return {accepted:[message.to],rejected:[]};};
    await check('contact reaches business inbox with reply-to and escaped HTML',async()=>{assert.equal((await post(requestRoute,contact)).status,200);assert.equal(outbound.to,'business@example.com');assert.equal(outbound.replyTo,contact.email);assert.ok(outbound.html.includes('&lt;img'));assert.ok(!outbound.html.includes('<img'));});
    await check('valid booking request accepted',async()=>assert.equal((await post(requestRoute,booking)).status,200));
    await check('booking email contains service hours and passengers',async()=>{await post(requestRoute,booking);assert.ok(outbound.html.includes('Service hours'));assert.ok(outbound.html.includes('Passengers'));});
    await check('oversized booking group rejected',async()=>assert.equal((await post(requestRoute,{...booking,passengerCount:99})).status,400));
    await check('invalid duration rejected',async()=>assert.equal((await post(requestRoute,{...booking,durationHours:0})).status,400));
    await check('campaign labels reach the inbox with escaped HTML',async()=>{await post(requestRoute,{...contact,campaign:{utm_source:'google',utm_campaign:'<b>airport</b>'}});assert.ok(outbound.html.includes('google'));assert.ok(outbound.html.includes('&lt;b&gt;airport'));});
    const {yachts,CHARTER_HOURS,MAX_CHARTER_GUESTS}=load(path.join(root,'src/lib/data/yachts.ts'));
    const charter={type:'yacht',name:'Charter Customer',email:'customer@example.com',phone:'3055550100',date:'2099-12-01',yachtId:yachts[0].id,guests:13,requests:'<b>Birthday</b>'};
    await check('all six yachts use confirmed duration and capacity with no public price',async()=>{
      assert.equal(yachts.length,6);assert.equal(CHARTER_HOURS,4);assert.equal(MAX_CHARTER_GUESTS,13);
      for(const yacht of yachts){assert.equal(yacht.price,undefined);assert.equal(yacht.images.length,2);for(const src of yacht.images)assert.ok(fs.existsSync(path.join(root,'public',src)));}
    });
    await check('every yacht inquiry reaches inbox with four hours and no invented price',async()=>{
      for(const yacht of yachts){assert.equal((await post(requestRoute,{...charter,yachtId:yacht.id,durationHours:1,total:1})).status,200);assert.ok(outbound.html.includes(yacht.name));assert.ok(outbound.html.includes('Charter hours:</strong> 4'));assert.ok(outbound.html.includes('Guests:</strong> 13'));assert.ok(outbound.html.includes('&lt;b&gt;Birthday'));assert.ok(!outbound.html.includes(String.fromCharCode(36)));}
    });
    await check('yacht inquiries reject invalid guests, old dates, and unknown yachts',async()=>{
      for(const guests of [0,14,1.5])assert.equal((await post(requestRoute,{...charter,guests})).status,400);
      assert.equal((await post(requestRoute,{...charter,date:'2020-01-01'})).status,400);
      assert.equal((await post(requestRoute,{...charter,yachtId:'unknown'})).status,400);
    });
    const {miamiDateTime,isFutureMiamiPickup}=load(path.join(root,'src/lib/utils/miamiTime.ts'));
    await check('Miami pickup validation is independent of visitor timezone',async()=>{const now=new Date('2026-10-29T15:00:00Z');assert.equal(miamiDateTime(now),'2026-10-29T11:00');assert.equal(isFutureMiamiPickup('2026-10-29','10:59',now),false);assert.equal(isFutureMiamiPickup('2026-10-29','11:01',now),true);});
    const {saveBookingDraft,takeBookingDraft}=load(path.join(root,'src/lib/utils/bookingDraft.ts'));const storage=new Map();global.sessionStorage={setItem:(k,v)=>storage.set(k,v),getItem:k=>storage.get(k)||null,removeItem:k=>storage.delete(k)};
    const rental={type:'rental',name:'Rental Customer',email:'customer@example.com',phone:'3055550100',vehicleId:'ferrari-f8',date:'2099-12-01',days:2,requests:'Preferred year'};
    await check('rental estimates use server daily rate and ignore tampered prices',async()=>{
      smtpState.send=async message=>{outbound=message;return {accepted:[message.to],rejected:[]};};
      assert.equal((await post(requestRoute,{...rental,dailyRate:1,total:1})).status,200);
      assert.ok(outbound.html.includes('$3,000'));assert.ok(outbound.html.includes('Chauffeur not included'));
    });
    await check('rental days and past dates validated',async()=>{for(const days of [0,1.5,31])assert.equal((await post(requestRoute,{...rental,days})).status,400);assert.equal((await post(requestRoute,{...rental,date:'2020-01-01'})).status,400);});
    await check('rental-only car cannot enter chauffeur booking',async()=>assert.equal((await post(requestRoute,{...booking,vehicleId:'ferrari-f8'})).status,400));
    const draft={vehicleId:'escalade-suv',serviceType:'airport',pickup:'Miami Airport',dropoff:'Miami Beach',date:'2099-12-01',time:'14:00',durationHours:3,passengerCount:2};
    await check('trip draft preserves details and is consumed once',async()=>{assert.equal(saveBookingDraft(draft),true);assert.deepEqual(takeBookingDraft(),draft);assert.equal(takeBookingDraft(),null);});
    await check('trip draft rejects invalid capacity and expires',async()=>{assert.equal(saveBookingDraft({...draft,passengerCount:99}),false);storage.set('luxride-booking-draft',JSON.stringify({expires:0,draft}));assert.equal(takeBookingDraft(),null);});
    await check('unknown vehicle rejected',async()=>assert.equal((await post(requestRoute,{...booking,vehicleId:'fake'})).status,400));
    await check('past booking rejected',async()=>assert.equal((await post(requestRoute,{...booking,date:'2000-01-01'})).status,400));
    await check('invalid email rejected',async()=>assert.equal((await post(requestRoute,{...contact,email:'invalid'})).status,400));
    const tour={type:'tour',tourId:'miami-city',persons:2,date:'2099-12-01',name:'Test',email:'customer@example.com'};
    await check('valid tour accepted',async()=>assert.equal((await post(requestRoute,tour)).status,200));
    await check('tour price is flat for every valid group size',async()=>{
      await post(requestRoute,{...tour,persons:2});const small=outbound.html;
      await post(requestRoute,{...tour,persons:10});const large=outbound.html;
      assert.ok(small.includes('$399.00'));assert.ok(large.includes('$399.00'));assert.ok(large.includes('paid separately'));
    });
    await check('invalid tour group size rejected',async()=>assert.equal((await post(requestRoute,{...tour,persons:999})).status,400));
    await check('JSON quote dates reconstructed and HTML escaped',async()=>{assert.equal((await post(emailRoute,{to:'customer@example.com',quote})).status,200);assert.ok(outbound.html.includes('&lt;b&gt;Airport'));});
    smtpState.send=async()=>({accepted:[],rejected:['customer@example.com']});
    await check('provider failures return an error for requests',async()=>assert.equal((await post(requestRoute,contact)).status,502));
    await check('provider failures return an error for quotes',async()=>assert.equal((await post(emailRoute,{to:'customer@example.com',quote})).status,502));
    smtpState.send=async()=>{throw new Error('network unavailable');};
    await check('network failures never report success',async()=>assert.equal((await post(requestRoute,contact)).status,502));
    smtpState.send=async message=>({accepted:[message.to],rejected:[]});
    await check('IONOS default connection uses implicit TLS on 465',async()=>{
      assert.equal((await post(requestRoute,contact)).status,200);
      assert.equal(smtpState.options.host,'smtp.ionos.com');assert.equal(smtpState.options.port,465);assert.equal(smtpState.options.secure,true);
    });
    await check('port 587 requires STARTTLS',async()=>{
      process.env.SMTP_PORT='587';assert.equal((await post(requestRoute,contact)).status,200);assert.equal(smtpState.options.secure,false);assert.equal(smtpState.options.requireTLS,true);
    });
    await check('unsafe SMTP port is rejected',async()=>{
      process.env.SMTP_PORT='25';assert.equal((await post(requestRoute,contact)).status,503);
    });
    process.env.GEOAPIFY_API_KEY='test-only';
    function mockGeo({location={},route={distance:16093.44,time:1200,distance_units:'meters'},empty=false}={}) {
      return async raw=>{const url=new URL(raw);assert.equal(url.hostname,'api.geoapify.com');assert.equal(url.searchParams.get('apiKey'),'test-only');
        if(url.pathname==='/v1/geocode/search') {assert.equal(url.searchParams.get('filter'),'countrycode:us');return Response.json({results:[{lat:25.8,lon:-80.2,formatted:'Verified street address, Miami, FL',result_type:'building',rank:{confidence:0.95},...location}]});}
        assert.equal(url.pathname,'/v1/routing');assert.equal(url.searchParams.get('mode'),'drive');assert.equal(url.searchParams.get('units'),'metric');assert.equal(url.searchParams.get('waypoints'),'25.8,-80.2|25.8,-80.2');
        return Response.json({features:empty?[]:[{properties:route}]});};
    }
    await check('Geoapify resolves addresses and returns real driving miles without exposing the key',async()=>{
      global.fetch=mockGeo();const response=await post(mapsRoute,{origin:'Verified origin',destination:'Verified destination'});assert.equal(response.status,200);const data=await response.json();assert.equal(data.distanceMiles,10);assert.equal(data.durationMinutes,20);assert.equal(data.provider,'geoapify');assert.ok(data.resolvedOrigin.includes('Miami'));assert.ok(!JSON.stringify(data).includes('test-only'));
    });
    await check('existing Vercel Geoapify secret name is supported',async()=>{delete process.env.GEOAPIFY_API_KEY;process.env.Geoapify='test-only';global.fetch=mockGeo();assert.equal((await post(mapsRoute,{origin:'Alias origin',destination:'Alias destination'})).status,200);delete process.env.Geoapify;process.env.GEOAPIFY_API_KEY='test-only';});
    await check('repeated route uses the bounded cache instead of external calls',async()=>{
      global.fetch=async()=>{throw new Error('Should use cached result');};assert.equal((await post(mapsRoute,{origin:'Verified origin',destination:'Verified destination'})).status,200);
    });
    await check('provider authorization errors never invent mileage',async()=>{
      global.fetch=async()=>new Response(null,{status:403});const response=await post(mapsRoute,{origin:'Error origin',destination:'Error destination'});assert.equal(response.status,502);assert.equal((await response.json()).distanceMiles,undefined);
    });
    await check('missing driving route is reported',async()=>{
      global.fetch=mockGeo({empty:true});assert.equal((await post(mapsRoute,{origin:'No route',destination:'No destination'})).status,422);
    });
    await check('city-only geocoding cannot generate a street-level quote',async()=>{
      global.fetch=mockGeo({location:{result_type:'city'}});assert.equal((await post(mapsRoute,{origin:'Miami city',destination:'Other city'})).status,422);
    });
    await check('uncertain geocoding asks for a precise address',async()=>{
      global.fetch=mockGeo({location:{rank:{confidence:0.2}}});assert.equal((await post(mapsRoute,{origin:'Uncertain origin',destination:'Uncertain destination'})).status,422);
    });
    await check('invalid coordinates are rejected before routing',async()=>{
      global.fetch=mockGeo({location:{lat:999}});assert.equal((await post(mapsRoute,{origin:'Invalid location',destination:'Invalid destination'})).status,422);
    });
    await check('route unit mismatch is rejected instead of mispricing miles',async()=>{
      global.fetch=mockGeo({route:{distance:10,time:1200,distance_units:'Miles'}});assert.equal((await post(mapsRoute,{origin:'Wrong units origin',destination:'Wrong units destination'})).status,502);
    });
    await check('negative route duration is rejected',async()=>{
      global.fetch=mockGeo({route:{distance:16093.44,time:-1,distance_units:'meters'}});assert.equal((await post(mapsRoute,{origin:'Bad duration origin',destination:'Bad duration destination'})).status,502);
    });
    await check('malformed maps requests never call the provider',async()=>{
      global.fetch=async()=>{throw new Error('No provider call expected');};assert.equal((await post(mapsRoute,'{')).status,400);assert.equal((await post(mapsRoute,{origin:123,destination:'Miami'})).status,400);
    });
    console.log(checks + ' checks passed; no real emails sent.');
  } finally {
    global.fetch=originalFetch; for(const key of keys) { if(old[key]===undefined)delete process.env[key];else process.env[key]=old[key]; }
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
