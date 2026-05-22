import Image from "next/image";
import { notFound } from "next/navigation";
import { Users, Briefcase, Zap, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteGenerator from "@/components/quote/QuoteGenerator";
import GlassCard from "@/components/ui/GlassCard";
import { getVehicleById, vehicles } from "@/lib/data/fleet";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; id: string }>;
}) {
  const { locale, id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) notFound();

  const related = vehicles
    .filter((v) => v.category === vehicle.category && v.id !== vehicle.id)
    .slice(0, 3);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        {/* Back */}
        <div className="container-luxe py-4">
          <Link href={`/${locale}/fleet`} className="flex items-center gap-2 text-cream/50 hover:text-gold text-sm transition-colors">
            <ArrowLeft size={14} /> Back to Fleet
          </Link>
        </div>

        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-10 inset-x-0 container-luxe">
            <span className="text-gold text-xs font-bold tracking-widest uppercase bg-gold/10 border border-gold/30 px-3 py-1 rounded-full mb-3 inline-block">
              {vehicle.category}
            </span>
            <h1 className="font-display font-black text-4xl md:text-6xl text-white">{vehicle.name}</h1>
            <p className="text-cream/60 text-lg mt-2">{vehicle.tagline}</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-luxe py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: specs and features */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick specs */}
              <GlassCard className="p-6">
                <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-5">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { Icon: Users, label: "Passengers", value: String(vehicle.passengers) },
                    { Icon: Briefcase, label: "Luggage", value: `${vehicle.luggage} bags` },
                    { Icon: Zap, label: "Rate", value: `${formatCurrency(vehicle.hourlyRate)}/hr` },
                    { Icon: CheckCircle, label: "Status", value: vehicle.available ? "Available" : "Booked" },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-4">
                      <Icon size={16} className="text-gold mb-2" />
                      <div className="text-cream/40 text-xs mb-1">{label}</div>
                      <div className="text-white font-semibold text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Features */}
              <GlassCard className="p-6">
                <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">Features</h3>
                <ul className="space-y-2.5">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-cream/70 text-sm">
                      <CheckCircle size={14} className="text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Vehicle info */}
              <GlassCard className="p-6">
                <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">Vehicle Details</h3>
                <dl className="space-y-2">
                  {Object.entries(vehicle.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <dt className="text-cream/40 capitalize">{k}</dt>
                      <dd className="text-cream/80">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </div>

            {/* Right: quote generator */}
            <div className="lg:col-span-3">
              <h2 className="font-display font-bold text-2xl text-white mb-6">Get Your Quote for the {vehicle.name}</h2>
              <QuoteGenerator locale={locale} />
            </div>
          </div>

          {/* Related vehicles */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display font-bold text-2xl text-white mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((v) => (
                  <Link key={v.id} href={`/${locale}/fleet/${v.category}/${v.id}`}>
                    <GlassCard hover className="overflow-hidden group">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={v.image} alt={v.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <div className="text-white font-bold">{v.name}</div>
                          <div className="text-gold text-sm">{formatCurrency(v.hourlyRate)}/hr</div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
