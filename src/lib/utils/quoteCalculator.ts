import { getVehicleById } from "@/lib/data/fleet";
import { QuoteInput, QuoteResult, QuoteLineItem } from "@/types/quote";

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
  const vehicle = getVehicleById(input.vehicleId);
  if (!vehicle) throw new Error("Please select a valid vehicle.");
  const pricing = { hourly: vehicle.hourlyRate, perMile: vehicle.perMileRate, freeMiles: vehicle.freeMiles };
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
