import { useTranslations } from "next-intl";
import Link from "next/link";
import { Car, Truck, Zap, Map, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const SERVICES = [
  { key: "limo", href: "/fleet?category=limousines", Icon: Car, color: "from-gold/20 to-gold/5" },
  { key: "suv", href: "/fleet?category=suvs", Icon: Truck, color: "from-blue-900/20 to-blue-900/5" },
  { key: "exotic", href: "/exotic", Icon: Zap, color: "from-red-900/20 to-red-900/5" },
  { key: "tours", href: "/tours", Icon: Map, color: "from-emerald-900/20 to-emerald-900/5" },
];

export default function ServicesGrid({ locale }: { locale: string }) {
  const t = useTranslations("services");

  return (
    <section className="section-padding bg-black-charcoal/30">
      <div className="container-luxe">
        <SectionHeading
          label="What We Offer"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ key, href, Icon, color }) => (
            <Link key={key} href={`/${locale}${href}`}>
              <GlassCard hover className="p-8 h-full group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className="text-gold" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed mb-6">
                  {t(`${key}.desc`)}
                </p>
                <div className="flex items-center gap-2 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  Learn More <ArrowRight size={14} />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
