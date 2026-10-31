import { z } from "zod";
import { chauffeurVehicles as vehicles } from "@/lib/data/fleet";

export const bookingDraftSchema = z.object({
  vehicleId: z.string().refine(id => vehicles.some(vehicle => vehicle.id === id)),
  serviceType: z.enum(["transfer", "hourly", "airport", "event"]),
  pickup: z.string().max(500), dropoff: z.string().max(500),
  date: z.union([z.iso.date(), z.literal("")]),
  time: z.union([z.iso.time({ precision: -1 }), z.literal("")]),
  durationHours: z.number().min(1).max(24),
  passengerCount: z.number().int().positive(),
}).refine(draft => draft.passengerCount <= (vehicles.find(vehicle => vehicle.id === draft.vehicleId)?.passengers ?? 0))
  .refine(draft => draft.serviceType !== "hourly" || draft.durationHours >= 3);
export type BookingDraft = z.infer<typeof bookingDraftSchema>;
const KEY = "luxride-booking-draft";

export function saveBookingDraft(draft: BookingDraft): boolean {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ expires: Date.now() + 3600000, draft: bookingDraftSchema.parse(draft) }));
    return true;
  } catch { return false; }
}

export function takeBookingDraft(): BookingDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw);
    if (typeof stored.expires !== "number" || stored.expires < Date.now()) return null;
    const parsed = bookingDraftSchema.safeParse(stored.draft);
    return parsed.success ? parsed.data : null;
  } catch { return null; }
}
