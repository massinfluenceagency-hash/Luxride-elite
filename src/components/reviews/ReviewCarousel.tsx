"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import ReviewCard from "./ReviewCard";

export default function ReviewCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000 })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black-charcoal border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-200 hidden md:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black-charcoal border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-200 hidden md:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
