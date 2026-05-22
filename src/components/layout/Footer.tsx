import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-black border-t border-gold/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
                <span className="text-black font-display font-black text-lg">L</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">LuxRide</div>
                <div className="text-gold text-xs tracking-widest font-semibold">ELITE</div>
              </div>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed mb-6">{t("tagline")}</p>
            <div className="flex gap-4">
              {[
                { label: "IG", href: "#" },
                { label: "FB", href: "#" },
                { label: "X", href: "#" },
              ].map(({ label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold transition-colors text-xs font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-semibold text-sm tracking-widest uppercase mb-5">{t("services")}</h4>
            <ul className="space-y-3">
              {[
                { label: nav("fleet"), href: "/fleet" },
                { label: nav("tours"), href: "/tours" },
                { label: nav("exotic"), href: "/exotic" },
                { label: nav("quote"), href: "/quote" },
                { label: nav("booking"), href: "/booking" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-cream/50 hover:text-gold text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gold font-semibold text-sm tracking-widest uppercase mb-5">{t("company")}</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: nav("pov"), href: "/pov" },
                { label: nav("contact"), href: "/contact" },
                { label: "Careers", href: "/careers" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-cream/50 hover:text-gold text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold text-sm tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream/50 text-sm">
                <Phone size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-cream/80 font-medium">(305) 555-1234</div>
                  <div className="text-xs">Available 24/7</div>
                </div>
              </li>
              <li className="flex items-start gap-3 text-cream/50 text-sm">
                <Mail size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-cream/80 font-medium">info@luxrideelite.com</div>
                  <div className="text-xs">Reply within 1 hour</div>
                </div>
              </li>
              <li className="flex items-start gap-3 text-cream/50 text-sm">
                <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-cream/80 font-medium">Miami Beach, FL</div>
                  <div className="text-xs">Serving all of South Florida</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-cream/30 text-xs">
          <span>© {new Date().getFullYear()} LuxRide Elite. {t("rights")}</span>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors">{t("privacy")}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
