import { formatCurrency } from "@/lib/utils/formatCurrency";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { vehicles } from "@/lib/data/fleet";
import { yachts, CHARTER_HOURS, MAX_CHARTER_GUESTS } from "@/lib/data/yachts";
import { tours, TOUR_PACKAGE_NOTICE } from "@/lib/data/tours";
import { escapeHtml, MailError, sendMail } from "@/lib/server/mail";

import { isFutureMiamiPickup } from "@/lib/utils/miamiTime";

const text = z.string().trim().min(1).max(500);
const campaign = z.object({ utm_source: z.string().max(120).optional(), utm_medium: z.string().max(120).optional(), utm_campaign: z.string().max(120).optional(), utm_content: z.string().max(120).optional(), utm_term: z.string().max(120).optional() }).optional();
const contact = { campaign, name: text.max(120), email: z.email().max(254) };
const date = z.iso.date().refine((value) => value >= new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }), "Please choose today or a future date.");
const schema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("yacht"), ...contact, phone: text.max(40), yachtId: text, date, guests: z.number().int().min(1).max(MAX_CHARTER_GUESTS), requests: z.string().trim().max(5000) }),
  z.object({ type: z.literal("rental"), ...contact, phone: text.max(40), vehicleId: text, date, days: z.number().int().min(1).max(30), requests: z.string().trim().max(5000) }),
  z.object({ type: z.literal("contact"), ...contact, phone: z.string().trim().max(40), message: text.max(5000) }),
  z.object({ type: z.literal("booking"), ...contact, phone: text.max(40), vehicleId: text, serviceType: z.enum(["transfer", "hourly", "airport", "event"]), durationHours: z.number().min(1).max(24), passengerCount: z.number().int().positive(), pickup: text, dropoff: text, date, time: z.iso.time({ precision: -1 }), requests: z.string().trim().max(5000) }),
  z.object({ type: z.literal("tour"), ...contact, tourId: text, persons: z.number().int().positive(), date }),
]);

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check your details." }, { status: 400 });
  const data = parsed.data;
  const details: Record<string, string> = { Name: data.name, Email: data.email };
  if (data.type === "booking") {
    if (data.serviceType === "hourly" && data.durationHours < 3) return NextResponse.json({ error: "Hourly chauffeur service has a three-hour minimum." }, { status: 400 });
    const vehicle = vehicles.find((item) => item.id === data.vehicleId);
    if (!vehicle?.chauffeurAvailable) return NextResponse.json({ error: "Please select a vehicle available for chauffeured service." }, { status: 400 });
    if (data.passengerCount > vehicle.passengers) return NextResponse.json({ error: "The passenger count exceeds this vehicle's capacity." }, { status: 400 });
    if (!isFutureMiamiPickup(data.date, data.time)) return NextResponse.json({ error: "Please choose a future pickup time in Miami." }, { status: 400 });
    Object.assign(details, { "Service hours": String(data.durationHours), Passengers: String(data.passengerCount), Vehicle: vehicle.name, Service: data.serviceType, Pickup: data.pickup, Dropoff: data.dropoff, Date: data.date, Time: `${data.time} (Miami time)`, Phone: data.phone, Requests: data.requests });
  } else if (data.type === "yacht") {
    const yacht = yachts.find(item => item.id === data.yachtId);
    if (!yacht) return NextResponse.json({ error: "Please select a valid yacht." }, { status: 400 });
    Object.assign(details, { Yacht: yacht.name, "Preferred date": data.date, "Charter hours": String(CHARTER_HOURS), Guests: String(data.guests), Phone: data.phone, Requests: data.requests, Terms: "Quote inquiry only. Availability, departure marina, charter price, captain and crew arrangements, fuel, marina fees, taxes, and gratuity require confirmation before reservation." });
  } else if (data.type === "rental") {
    const vehicle = vehicles.find(item => item.id === data.vehicleId);
    if (!vehicle?.dailyRate) return NextResponse.json({ error: "Please select a valid rental vehicle." }, { status: 400 });
    Object.assign(details, { Vehicle: vehicle.name, "Pickup date": data.date, "Rental days": String(data.days), "Daily vehicle rate": formatCurrency(vehicle.dailyRate), "Base rental estimate": formatCurrency(vehicle.dailyRate * data.days), Phone: data.phone, Requests: data.requests, Terms: "Rental inquiry only. Availability, exact vehicle, taxes, deposit, insurance, mileage, and delivery terms require confirmation. Chauffeur not included." });
  } else if (data.type === "tour") {
    const tour = tours.find((item) => item.id === data.tourId);
    if (!tour || data.persons < tour.minPersons || data.persons > tour.maxPersons) return NextResponse.json({ error: "Please check the tour and group size." }, { status: 400 });
    Object.assign(details, { Tour: tour.title, Date: data.date, Persons: String(data.persons), Package: tour.duration, "Vehicle package price": formatCurrency(tour.packagePrice), "Pricing scope": TOUR_PACKAGE_NOTICE });
  } else Object.assign(details, { Phone: data.phone, Message: data.message });

  if (data.campaign) for (const [key, value] of Object.entries(data.campaign)) { if (value) details[key] = value; }

  try {
    const recipient = process.env.BOOKING_EMAIL;
    if (!recipient) throw new MailError("Online requests are temporarily unavailable. Please call us to arrange your service.", 503);
    const html = `<h1>New LuxRide Elite ${data.type} request</h1>${Object.entries(details).map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join("")}`;
    await sendMail(recipient, `LuxRide Elite: new ${data.type} request`, html, data.email);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof MailError ? error.message : "Your request could not be sent. Please try again or call us." }, { status: error instanceof MailError ? error.status : 502 });
  }
}
