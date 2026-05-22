import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import VehicleCard from "@/components/fleet/VehicleCard";
import { featuredVehicles } from "@/lib/data/fleet";

export default function FleetPreview({ locale }: { locale: string }) {
  const t = useTranslations("fleet");
  const preview = featuredVehicles.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-luxe">
        <SectionHeading
          label="Our Fleet"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {preview.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href={`/${locale}/fleet`}
            className="inline-flex items-center gap-2 border border-gold/50 text-cream px-10 py-4 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
          >
            {t("view_all")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
