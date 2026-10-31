import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CTASection({ locale }: { locale: string }) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gold-gradient opacity-95" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-black text-4xl md:text-6xl text-black mb-6 leading-tight">
          Your Black SUV & Driver Await
        </h2>
        <p className="text-black/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Share your pickup, destination, and schedule. Request a Suburban or Escalade with a professional chauffeur for your airport ride, private transfer, or hourly service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-10 py-4 rounded-full hover:bg-black/80 transition-all duration-300 group text-lg"
          >
            Request a Chauffeur Ride
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+18002404727"
            className="inline-flex items-center gap-2 border-2 border-black text-black font-semibold px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-lg"
          >
            <Phone size={18} />
            1 (800) 240-4727
          </a>
        </div>
      </div>
    </section>
  );
}
