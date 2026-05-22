import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, Star } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import GlassCard from "@/components/ui/GlassCard";

interface VehicleCardProps {
  vehicle: Vehicle;
  locale: string;
}

export default function VehicleCard({ vehicle, locale }: VehicleCardProps) {
  return (
    <Link href={`/${locale}/fleet/${vehicle.category}/${vehicle.id}`}>
      <GlassCard hover className="overflow-hidden group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-charcoal via-transparent to-transparent" />
          {vehicle.popular && (
            <div className="absolute top-3 right-3 bg-gold-gradient text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={10} fill="black" /> Popular
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
              {vehicle.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display font-bold text-xl text-white mb-1">{vehicle.name}</h3>
          <p className="text-cream/50 text-sm mb-4">{vehicle.tagline}</p>

          {/* Specs row */}
          <div className="flex gap-4 mb-4 text-cream/60 text-sm">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-gold" />
              <span>{vehicle.passengers} pax</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-gold" />
              <span>{vehicle.luggage} bags</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {vehicle.features.slice(0, 3).map((f) => (
              <span key={f} className="text-xs text-cream/40 bg-white/5 px-2.5 py-1 rounded-full">
                {f}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-gold font-display font-bold text-2xl">{formatCurrency(vehicle.hourlyRate)}</span>
              <span className="text-cream/40 text-sm ml-1">/hr</span>
            </div>
            <div className="bg-gold/10 border border-gold/30 text-gold text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-gold group-hover:text-black transition-all duration-300">
              View Details
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
