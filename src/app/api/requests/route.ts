import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { vehicles } from "@/lib/data/fleet";
import { tours } from "@/lib/data/tours";
import { escapeHtml, MailError, sendMail } from "@/lib/server/mail";

const text = z.string().trim().min(1).max(500);
const contact = { name: text.max(120), email: z.email().max(254) };
const date = z.iso.date().refine((value) => value >= new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }), "Please choose today or a future date.");
const schema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("contact"), ...contact, phone: z.string().trim().max(40), message: text.max(5000) }),
  z.object({ type: z.literal("booking"), ...contact, phone: text.max(40), vehicleId: text, serviceType: z.enum(["transfer", "hourly", "airport", "event"]), pickup: text, dropoff: text, date, time: z.iso.time({ precision: -1 }), requests: z.string().trim().max(5000) }),
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
    const vehicle = vehicles.find((item) => item.id === data.vehicleId);
    if (!vehicle) return NextResponse.json({ error: "Please select a valid vehicle." }, { status: 400 });
    Object.assign(details, { Vehicle: vehicle.name, Service: data.serviceType, Pickup: data.pickup, Dropoff: data.dropoff, Date: data.date, Time: `${data.time} (Miami time)`, Phone: data.phone, Requests: data.requests });
  } else if (data.type === "tour") {
    const tour = tours.find((item) => item.id === data.tourId);
    if (!tour || data.persons < tour.minPersons || data.persons > tour.maxPersons) return NextResponse.json({ error: "Please check the tour and group size." }, { status: 400 });
    Object.assign(details, { Tour: tour.title, Date: data.date, Persons: String(data.persons), "Estimated total": `$${(tour.pricePerPerson * data.persons).toFixed(2)}` });
  } else Object.assign(details, { Phone: data.phone, Message: data.message });

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
