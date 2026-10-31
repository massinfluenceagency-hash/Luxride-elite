export const FIRST_RENTAL_DISCOUNT = 0.25;
export const FIRST_RIDE_MIN_HOURS = 3;
const FIRST_RIDE_RATES: Record<string, number> = { "suburban-suv": 50, "escalade-suv": 75 };

export function firstRideRate(vehicleId: string, serviceType: string, hours: number): number {
  if (serviceType !== "hourly" || !Object.hasOwn(FIRST_RIDE_RATES, vehicleId)) throw new Error("The first-time ride offer applies only to hourly Suburban or Escalade chauffeur service.");
  if (hours < FIRST_RIDE_MIN_HOURS) throw new Error("The first-time ride promotion has a three-hour minimum. Regular hourly service does not have this promotion minimum.");
  return FIRST_RIDE_RATES[vehicleId];
}
