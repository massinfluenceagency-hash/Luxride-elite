import Link from "next/link";
export default function MoreExperiences({ locale }: { locale: string }) {
  const options = [
    { title: "Luxury Car Rentals", description: "Prefer to drive? Get 25% off your first car rental. Eligibility confirmed before booking.", href: "/fleet" },
    { title: "Yacht Charters", description: "Plan a four-hour private charter for up to 13 guests.", href: "/yachts" },
    { title: "Private Sightseeing", description: "Explore South Florida with a vehicle and chauffeur. Activities paid separately.", href: "/tours" },
  ];
  return <section className="container-luxe py-14"><h2 className="font-display text-white text-2xl font-bold mb-6">More from LuxRide Elite</h2><div className="grid md:grid-cols-3 gap-5">{options.map(option => <Link key={option.href} href={`/${locale}${option.href}`} className="rounded-xl border border-white/15 p-6 hover:border-gold/50 transition-colors"><h3 className="font-semibold text-white text-lg">{option.title}</h3><p className="text-cream/60 text-sm mt-3 mb-4">{option.description}</p><span className="text-gold text-sm">Explore →</span></Link>)}</div></section>;
}
