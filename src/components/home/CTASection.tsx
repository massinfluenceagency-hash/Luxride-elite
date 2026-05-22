import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CTASection({ locale }: { locale: string }) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gold-gradient opacity-95" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=60')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-black text-4xl md:text-6xl text-black mb-6 leading-tight">
          Ready to Ride in Luxury?
        </h2>
        <p className="text-black/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Book your LuxRide Elite experience today. Available 24/7 for transfers, tours, and special events across Miami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/quote`}
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-10 py-4 rounded-full hover:bg-black/80 transition-all duration-300 group text-lg"
          >
            Get Instant Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+13055551234"
            className="inline-flex items-center gap-2 border-2 border-black text-black font-semibold px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-lg"
          >
            <Phone size={18} />
            (305) 555-1234
          </a>
        </div>
      </div>
    </section>
  );
}
