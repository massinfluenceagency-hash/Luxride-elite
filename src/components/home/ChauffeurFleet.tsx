import Link from "next/link";
import VehiclePhoto from "@/components/fleet/VehiclePhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { chauffeurVehicles } from "@/lib/data/fleet";

export default function ChauffeurFleet({ locale }: { locale: string }) {
  return <section className="section-padding"><div className="container-luxe">
    <SectionHeading label="Your Ride, With a Driver" title="Black SUVs. Professional Chauffeurs." subtitle="Choose a Chevrolet Suburban or Cadillac Escalade for airport transfers, hourly service, and private rides across South Florida." />
    <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto">
      {chauffeurVehicles.map(vehicle => <article key={vehicle.id} className="rounded-2xl border border-gold/20 overflow-hidden bg-black-charcoal">
        <div className="relative aspect-[1.346]"><VehiclePhoto vehicle={vehicle} /></div>
        <div className="p-6 sm:p-8"><p className="text-gold text-xs tracking-widest uppercase mb-2">Chauffeured Black SUV</p><h3 className="font-display text-white text-2xl font-bold">{vehicle.name}</h3><p className="text-cream/60 mt-3 mb-6">Your vehicle and professional driver for airport pickups, point-to-point rides, or time reserved by the hour.</p><Link href={`/${locale}/quote?vehicle=${vehicle.id}`} className="inline-block bg-gold-gradient text-black font-semibold px-6 py-3 rounded-full">Request {vehicle.specs.model} Service →</Link></div>
      </article>)}
    </div>
  </div></section>;
}
