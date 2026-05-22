import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { vehicles } from "@/lib/data/fleet";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function ExoticPreview({ locale }: { locale: string }) {
  const exotics = vehicles.filter((v) => v.category === "exotic").slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-luxe">
        <SectionHeading
          label="Exotic Collection"
          title="Drive the Extraordinary"
          subtitle="Rent the world's most coveted supercars and luxury vehicles — by the hour or by the day"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {exotics.map((v) => (
            <Link key={v.id} href={`/${locale}/fleet/${v.category}/${v.id}`}>
              <GlassCard hover className="overflow-hidden group h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-charcoal to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
                    <div>
                      <div className="text-white font-display font-bold text-lg">{v.name}</div>
                      <div className="text-gold text-sm">{v.specs.make} {v.specs.model}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-gold/20 border border-gold/30 rounded-full px-3 py-1.5">
                      <Zap size={12} className="text-gold" />
                      <span className="text-gold text-xs font-bold">{formatCurrency(v.hourlyRate)}/hr</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {v.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-xs text-cream/40 bg-white/5 px-2.5 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            href={`/${locale}/exotic`}
            className="inline-flex items-center gap-2 bg-gold-gradient text-black font-semibold px-10 py-4 rounded-full hover:shadow-gold hover:scale-105 transition-all duration-300 group"
          >
            View Exotic Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
