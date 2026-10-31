import Link from "next/link";
import { Plane, MapPin, Clock, CalendarDays, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ServicesGrid({ locale }: { locale: string }) {
  const services = [
    { title: "Airport Pickups", description: "Private black SUV transfers to and from Miami and Fort Lauderdale airports. Share your flight and pickup details.", Icon: Plane },
    { title: "Pickups & Drop-offs", description: "A professional chauffeur for your hotel, home, meeting, or venue. Send your route for a transfer quote.", Icon: MapPin },
    { title: "Hourly Chauffeur", description: "Keep a driver and black SUV for meetings, errands, and multiple stops. Three-hour minimum for hourly service.", Icon: Clock },
    { title: "Events & Nights Out", description: "Arrange your arrival and return ride for celebrations, dinners, concerts, and special occasions.", Icon: CalendarDays },
  ];
  return <section className="section-padding bg-black-charcoal/30"><div className="container-luxe"><SectionHeading label="Black SUV & Limo Service" title="Where Do You Need to Go?" subtitle="Chauffeured Suburban and Escalade service for your airport transfer, daily plans, or special occasion." /><div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">{services.map(({ title, description, Icon }) => <Link key={title} href={`/${locale}/booking`} className="rounded-2xl border border-gold/20 bg-black-charcoal p-7 hover:border-gold/50 transition-colors"><Icon size={28} className="text-gold mb-6" /><h3 className="font-display text-white font-bold text-xl">{title}</h3><p className="text-cream/60 text-sm mt-3 mb-6 leading-relaxed">{description}</p><span className="text-gold text-sm font-semibold inline-flex items-center gap-2">Request a Ride <ArrowRight size={14} /></span></Link>)}</div></div></section>;
}
