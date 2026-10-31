"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[85svh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background video / image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/fleet/real/suburban-suv.webp" alt="Black Chevrolet Suburban for professional chauffeur service" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center 52%" }} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Gold particle accents */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold-gradient" />
            <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase">
              Black SUVs · Professional Chauffeurs
            </span>
            <div className="h-px w-12 bg-gold-gradient" />
          </div>

          {/* Headline */}
          <h1 className="heading-hero mb-6 max-w-5xl mx-auto">
            {t("tagline")}
          </h1>

          {/* Subheadline */}
          <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/booking`}
              className="group bg-gold-gradient text-black font-semibold px-10 py-4 rounded-full hover:shadow-gold hover:scale-105 transition-all duration-300 flex items-center gap-2 text-lg"
            >
              Request a Chauffeur Ride
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/chauffeur`}
              className="border border-gold/50 text-cream px-10 py-4 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300 text-lg"
            >
              {t("cta_fleet")}
            </Link>
          </div>
        </motion.div>

        <Link href={`/${locale}/quote?promotion=first-time&vehicle=suburban-suv`} className="inline-block mt-6 text-gold text-sm font-semibold underline underline-offset-4">First-time offer: Suburban $50/hr · Escalade $75/hr · 3-hour promotional minimum</Link>
        <p className="mt-5 text-cream/80 text-sm">Airport pickups · Private transfers · Hourly drivers · Events</p>
        <a href="tel:+18002404727" className="inline-flex items-center gap-2 mt-4 py-2 text-gold font-semibold"><Phone size={16} /> 1 (800) 240-4727</a>
      </div>
    </section>
  );
}
