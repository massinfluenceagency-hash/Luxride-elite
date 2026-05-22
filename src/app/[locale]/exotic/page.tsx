import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Zap, Users, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { vehicles } from "@/lib/data/fleet";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default async function ExoticPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const exotics = vehicles.filter((v) => v.category === "exotic");

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1920&q=60')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-black" />
          <div className="container-luxe relative z-10">
            <SectionHeading
              label="Exotic Car Rental"
              title="Drive the Extraordinary"
              subtitle="Miami's finest selection of supercars and ultra-luxury vehicles — reserved exclusively for those with exceptional taste"
            />
          </div>
        </div>

        {/* Exotic grid */}
        <section className="section-padding">
          <div className="container-luxe">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {exotics.map((vehicle) => (
                <GlassCard key={vehicle.id} hover className="overflow-hidden group flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-gold-gradient text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Zap size={10} fill="black" /> {vehicle.specs.make}
                    </div>
                    <div className="absolute bottom-4 inset-x-4">
                      <h3 className="font-display font-black text-2xl text-white">{vehicle.name}</h3>
                      <p className="text-gold text-sm">{vehicle.specs.year} · {vehicle.specs.color}</p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-cream/50 text-sm mb-5">{vehicle.tagline}</p>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-white/5 rounded-xl p-3">
                        <div className="text-cream/40 text-xs mb-1">Daily Rate</div>
                        <div className="text-gold font-bold">{formatCurrency(vehicle.hourlyRate * 8)}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3">
                        <div className="text-cream/40 text-xs mb-1">Hourly</div>
                        <div className="text-gold font-bold">{formatCurrency(vehicle.hourlyRate)}/hr</div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {vehicle.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-cream/60 text-sm">
                          <CheckCircle size={13} className="text-gold flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex gap-3">
                      <Link
                        href={`/${locale}/fleet/${vehicle.category}/${vehicle.id}`}
                        className="flex-1 bg-gold-gradient text-black text-sm font-bold py-3 rounded-xl text-center hover:shadow-gold transition-all duration-300"
                      >
                        Book Now
                      </Link>
                      <Link
                        href={`/${locale}/quote`}
                        className="border border-gold/40 text-gold text-sm font-semibold py-3 px-4 rounded-xl hover:bg-gold/10 transition-all duration-300"
                      >
                        Quote
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="section-padding bg-black-charcoal/30 border-t border-gold/10">
          <div className="container-luxe">
            <SectionHeading
              label="The Difference"
              title="Why LuxRide Exotic?"
              subtitle="We don't just rent cars — we curate experiences"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "100% Owned Fleet", desc: "No brokers, no middlemen. Every car is ours, maintained to factory specs." },
                { title: "Insured & Certified", desc: "Full commercial insurance, roadside assistance, 24/7 support included." },
                { title: "Delivery Available", desc: "We deliver to your hotel, airport, or venue anywhere in South Florida." },
                { title: "Flexible Terms", desc: "From 2-hour experiences to week-long adventures — we accommodate your plans." },
              ].map(({ title, desc }) => (
                <div key={title} className="text-center">
                  <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mx-auto mb-4">
                    <Zap size={18} className="text-gold" />
                  </div>
                  <h4 className="font-display font-bold text-white text-lg mb-2">{title}</h4>
                  <p className="text-cream/50 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
