import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BookingFAQ({ locale }: { locale: string }) {
  const questions = [
    ["Does my ride include a chauffeur?", "Yes. Our black SUV service pairs a Chevrolet Suburban or Cadillac Escalade with a professional driver. Daily self-drive car rentals are a separate service."],
    ["Can I book just a pickup and drop-off?", "Yes. Send your pickup and destination addresses for a transfer quote. Airport and point-to-point rides are separate from hourly chauffeur service."],
    ["Is there a minimum for hourly service?", "Hourly chauffeur service has a three-hour minimum. Tell us your schedule and stops so our team can confirm the service and final price."],
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
