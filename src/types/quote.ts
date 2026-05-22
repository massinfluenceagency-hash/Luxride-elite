export type ServiceType = "transfer" | "hourly" | "airport" | "tour" | "event";

export interface QuoteInput {
  serviceType: ServiceType;
  vehicleId: string;
  origin: string;
  destination: string;
  distanceMiles: number;
  durationHours: number;
  date: Date;
  passengerCount: number;
  isAirportTransfer: boolean;
}

export interface QuoteLineItem {
  label: string;
  amount: number;
  type: "base" | "distance" | "airport" | "peak" | "subtotal" | "tax" | "total";
}

export interface QuoteResult {
  quoteId: string;
  vehicleName: string;
  serviceType: ServiceType;
  origin: string;
  destination: string;
  distanceMiles: number;
  durationHours: number;
  date: Date;
  passengerCount: number;
  baseRate: number;
  distanceSurcharge: number;
  airportFee: number;
  peakSurcharge: number;
  subtotal: number;
  tax: number;
  total: number;
  breakdown: QuoteLineItem[];
  validUntil: Date;
  createdAt: Date;
}
