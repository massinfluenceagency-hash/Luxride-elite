import { CHAUFFEUR_DEPOSIT_NOTICE, CHAUFFEUR_CANCELLATION_NOTICE, TRANSFER_PRICE_NOTICE } from "@/lib/data/bookingPolicies";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BookingFAQ({ locale }: { locale: string }) {
  const questions = [
    ["How many passengers and bags can ride?", "Our SUVs accommodate up to 7 passengers, or up to 6 in premium SUVs with captain’s chairs. With all passenger seats occupied, allow approximately 4–5 checked bags. Fewer passengers can leave room for more luggage. Share your passenger count, bag count and bag sizes; our team confirms fit for the vehicle configuration before you reserve."],
    ["What deposit is required for chauffeur service?", CHAUFFEUR_DEPOSIT_NOTICE],
    ["What is the chauffeur cancellation policy?", CHAUFFEUR_CANCELLATION_NOTICE],
    ["How are transfer prices confirmed?", TRANSFER_PRICE_NOTICE],
    ["Does my ride include a chauffeur?", "Yes. Our black SUV service pairs a Chevrolet Suburban or Cadillac Escalade with a professional driver. Daily self-drive car rentals are a separate service."],
    ["Can I book just a pickup and drop-off?", "Yes. Suburban transfers include the first 10 miles for $50, then $5 per additional mile. Escalade and premium SUVs include the first 10 miles for $75, then $7.50 per additional mile. Prices are per vehicle, one way, before taxes and applicable extras."],
    ["Does the first-time chauffeur promotion have a minimum?", "The Suburban $50/hour and Escalade $75/hour first-time offers require at least three hours. That minimum applies only to the promotion, not regular hourly service or transfers. Eligibility and final pricing are confirmed by our team."],
    ["How do airport pickups work?", "Share your airport, flight details, arrival date, passenger count, and luggage requirements. Our team will confirm the pickup arrangements. Ask about child seats or other needs before reserving."],
    ["How do I reserve my chauffeur ride?", "Send your pickup and drop-off locations, date, Miami pickup time, passenger count, and preferred SUV. Our team will confirm availability, pricing, and reservation details. Sending a request does not secure a reservation."],
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
