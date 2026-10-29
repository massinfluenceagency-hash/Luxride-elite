import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BookingFAQ({ locale }: { locale: string }) {
  const questions = [
    ["How do I reserve a vehicle?", "Send your pickup and drop-off locations, date, Miami pickup time, passenger count, and preferred vehicle. Our team will confirm availability, final pricing, and reservation details. Sending a request does not secure a reservation."],
    ["What does a sightseeing package include?", "The reserved luxury vehicle and professional chauffeur. Half Day packages cover 3–4 hours; Full Day packages cover 6–8 hours. The package price covers the group within the listed capacity."],
    ["Are activities and admission tickets included?", "No. Activities, admission, yacht services, food, drinks, equipment, and other third-party services must be arranged and paid for separately. Stops depend on the agreed schedule and available time."],
    ["Can I request an airport pickup or a special event?", "Yes. Share your flight or event details, luggage requirements, and any special requests. Ask the team to confirm child seats, accessibility needs, and other arrangements before reserving."],
    ["What if the online quote is unavailable?", "You can send a booking request without an automated quote, or call 1 (800) 240-4727. Our team will review your itinerary and provide pricing."],
  ];
  return <section className="section-padding border-t border-gold/20">
    <div className="container-luxe max-w-4xl">
      <SectionHeading label="Plan Your Ride" title="Before You Book" subtitle="Clear details for a smoother Miami experience." />
      <div className="space-y-3">{questions.map(([question, answer]) => <details key={question} className="rounded-xl border border-white/15 bg-black-charcoal p-5">
        <summary className="cursor-pointer text-white font-semibold py-1">{question}</summary>
        <p className="text-cream/80 text-sm leading-relaxed mt-4">{answer}</p>
      </details>)}</div>
      <div className="text-center mt-8"><Link href={`/${locale}/booking`} className="inline-block bg-gold-gradient text-black font-semibold px-8 py-4 rounded-full">Request availability</Link></div>
    </div>
  </section>;
}
