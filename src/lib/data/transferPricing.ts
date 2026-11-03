export const TRANSFER_INCLUDED_MILES = 10;
export const isDistanceService = (service: string) => service === "transfer" || service === "airport";
export function transferPricing(vehicleId: string) {
  return vehicleId === "suburban-suv" ? { minimum: 50, perMile: 5 } : { minimum: 75, perMile: 7.5 };
}
export function transferFare(vehicleId: string, miles: number) {
  if (!Number.isFinite(miles) || miles < 0) throw new Error("Please enter a valid driving distance.");
  const rate = transferPricing(vehicleId);
  return { ...rate, excessMiles: Math.max(0, miles - TRANSFER_INCLUDED_MILES), base: rate.minimum, distance: Math.max(0, miles - TRANSFER_INCLUDED_MILES) * rate.perMile };
}
