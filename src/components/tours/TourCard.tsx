import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Tour } from "@/types/tour";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import GlassCard from "@/components/ui/GlassCard";

interface TourCardProps {
  tour: Tour;
  locale: string;
}

export default function TourCard({ tour, locale }: TourCardProps) {
  return (
    <Link href={`/${locale}/tours/${tour.slug}`}>
      <GlassCard hover className="overflow-hidden group h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          {tour.popular && (
            <div className="absolute top-3 right-3 bg-gold-gradient text-black text-xs font-bold px-3 py-1 rounded-full">
              Popular
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 text-cream/80 text-sm">
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-gold" /> {tour.duration}
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={13} className="text-gold" /> {tour.minPersons}–{tour.maxPersons} pax
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display font-bold text-xl text-white mb-2">{tour.title}</h3>
          <p className="text-cream/50 text-sm leading-relaxed mb-4 flex-1">{tour.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {tour.highlights.slice(0, 3).map((h) => (
              <span key={h} className="text-xs text-cream/40 bg-white/5 px-2.5 py-1 rounded-full">{h}</span>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-gold font-display font-bold text-2xl">{formatCurrency(tour.pricePerPerson)}</span>
              <span className="text-cream/40 text-sm ml-1">/person</span>
            </div>
            <div className="flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-2.5 transition-all">
              Book Tour <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
