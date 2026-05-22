"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { key: "fleet", href: "/fleet" },
  { key: "tours", href: "/tours" },
  { key: "exotic", href: "/exotic" },
  { key: "pov", href: "/pov" },
  { key: "contact", href: "/contact" },
];

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-gold/20 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="text-black font-display font-black text-lg">L</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none">LuxRide</div>
              <div className="text-gold text-xs tracking-widest font-semibold">ELITE</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="text-cream/80 hover:text-gold transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
            <a href="tel:+13055551234" className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors text-sm">
              <Phone size={14} />
              <span>(305) 555-1234</span>
            </a>
            <Link
              href={`/${locale}/quote`}
              className="bg-gold-gradient text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-gold hover:scale-105 transition-all duration-300"
            >
              {t("quote")}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-md border-t border-gold/20 mt-3">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="text-cream/80 hover:text-gold transition-colors py-2 text-lg font-medium border-b border-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <LanguageSwitcher currentLocale={locale} />
              <Link
                href={`/${locale}/quote`}
                className="bg-gold-gradient text-black text-sm font-semibold px-6 py-2.5 rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                {t("booking")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
