import { QuoteInput, QuoteResult, QuoteLineItem } from "@/types/quote";

const PRICING: Record<string, { hourly: number; perMile: number; freeMiles: number }> = {
  "stretch-limo": { hourly: 150, perMile: 3.5, freeMiles: 30 },
  "party-bus": { hourly: 200, perMile: 4.0, freeMiles: 30 },
  "escalade-suv": { hourly: 120, perMile: 2.5, freeMiles: 30 },
  "navigator-suv": { hourly: 110, perMile: 2.0, freeMiles: 30 },
  "suburban-suv": { hourly: 105, perMile: 2.0, freeMiles: 30 },
  "rolls-royce": { hourly: 600, perMile: 12.0, freeMiles: 20 },
  "ferrari-488": { hourly: 500, perMile: 10.0, freeMiles: 20 },
  "lamborghini-huracan": { hourly: 550, perMile: 11.0, freeMiles: 20 },
  "bentley-flying-spur": { hourly: 450, perMile: 9.0, freeMiles: 20 },
  "mclaren-720s": { hourly: 480, perMile: 10.0, freeMiles: 20 },
};

const DEFAULT_PRICING = { hourly: 120, perMile: 2.5, freeMiles: 30 };
const AIRPORT_FEE = 75;
const PEAK_MULTIPLIER = 0.2;
const TAX_RATE = 0.07;
const MIAMI_DADE_TAX = TAX_RATE;

function isPeakHour(date: Date): boolean {
  const day = date.getDay();
  const hour = date.getHours();
  return (day === 5 || day === 6) && hour >= 20 && hour <= 26;
}

export function calculateQuote(input: QuoteInput, vehicleName: string): QuoteResult {
  const pricing = PRICING[input.vehicleId] ?? DEFAULT_PRICING;
  const baseRate = pricing.hourly * input.durationHours;
  const excessMiles = Math.max(0, input.distanceMiles - pricing.freeMiles);
  const distanceSurcharge = excessMiles * pricing.perMile;
  const airportFee = input.isAirportTransfer ? AIRPORT_FEE : 0;
  const subtotalBeforePeak = baseRate + distanceSurcharge + airportFee;
  const peakSurcharge = isPeakHour(input.date) ? subtotalBeforePeak * PEAK_MULTIPLIER : 0;
  const subtotal = subtotalBeforePeak + peakSurcharge;
  const tax = subtotal * MIAMI_DADE_TAX;
  const total = subtotal + tax;

  const breakdown: QuoteLineItem[] = [
    { label: `Base Rate (${input.durationHours}h × $${pricing.hourly}/hr)`, amount: baseRate, type: "base" },
    ...(distanceSurcharge > 0
      ? [{ label: `Distance Charge (${excessMiles.toFixed(1)} extra mi × $${pricing.perMile})`, amount: distanceSurcharge, type: "distance" as const }]
      : []),
    ...(airportFee > 0 ? [{ label: "Airport Transfer Fee", amount: airportFee, type: "airport" as const }] : []),
    ...(peakSurcharge > 0 ? [{ label: "Peak Hours Surcharge (20%)", amount: peakSurcharge, type: "peak" as const }] : []),
    { label: "Subtotal", amount: subtotal, type: "subtotal" },
    { label: "Miami-Dade Tax (7%)", amount: tax, type: "tax" },
    { label: "Total", amount: total, type: "total" },
  ];

  const validUntil = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const quoteId = `LRE-${Date.now().toString(36).toUpperCase()}`;

  return {
    quoteId,
    vehicleName,
    serviceType: input.serviceType,
    origin: input.origin,
    destination: input.destination,
    distanceMiles: input.distanceMiles,
    durationHours: input.durationHours,
    date: input.date,
    passengerCount: input.passengerCount,
    baseRate,
    distanceSurcharge,
    airportFee,
    peakSurcharge,
    subtotal,
    tax,
    total,
    breakdown,
    validUntil,
    createdAt: new Date(),
  };
}
