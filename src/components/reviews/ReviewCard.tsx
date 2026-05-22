import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Review } from "@/types/review";
import GlassCard from "@/components/ui/GlassCard";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <GlassCard className="p-8 h-full flex flex-col">
      <Quote size={28} className="text-gold/40 mb-4" />
      <p className="text-cream/70 leading-relaxed mb-6 flex-1 text-sm md:text-base">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < review.rating ? "text-gold fill-gold" : "text-cream/20"} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30">
          <Image src={review.avatar} alt={review.name} fill className="object-cover" />
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{review.name}</div>
          <div className="text-cream/40 text-xs">{review.location}</div>
          <div className="text-gold/60 text-xs mt-0.5">{review.service} · {review.date}</div>
        </div>
      </div>
    </GlassCard>
  );
}
