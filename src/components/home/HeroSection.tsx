"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video / image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90')",
          }}
        />
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold-gradient" />
            <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase">
              Miami&apos;s Premier Luxury Service
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
              href={`/${locale}/quote`}
              className="group bg-gold-gradient text-black font-semibold px-10 py-4 rounded-full hover:shadow-gold hover:scale-105 transition-all duration-300 flex items-center gap-2 text-lg"
            >
              {t("cta_quote")}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/fleet`}
              className="border border-gold/50 text-cream px-10 py-4 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300 text-lg"
            >
              {t("cta_fleet")}
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40 text-xs tracking-widest uppercase"
        >
          <span>{t("scroll")}</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
