import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import TourCard from "@/components/tours/TourCard";
import { tours } from "@/lib/data/tours";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ToursPreview({ locale }: { locale: string }) {
  const t = useTranslations("tours");

  return (
    <section className="section-padding bg-black-charcoal/30">
      <div className="container-luxe">
        <SectionHeading
          label="Exclusive Tours"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tours.slice(0, 3).map((tour) => (
            <TourCard key={tour.id} tour={tour} locale={locale} />
          ))}
        </div>
        {/* Show remaining 2 tours in wider layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {tours.slice(3).map((tour) => (
            <TourCard key={tour.id} tour={tour} locale={locale} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 border border-gold/50 text-cream px-10 py-4 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
          >
            View All Tours
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
