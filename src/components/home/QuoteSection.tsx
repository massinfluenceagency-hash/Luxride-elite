import { useTranslations } from "next-intl";
import QuoteGenerator from "@/components/quote/QuoteGenerator";
import SectionHeading from "@/components/ui/SectionHeading";

export default function QuoteSection({ locale }: { locale: string }) {
  const t = useTranslations("quote");

  return (
    <section className="section-padding bg-black-charcoal/50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container-luxe relative z-10">
        <SectionHeading
          label="Instant Pricing"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="max-w-4xl mx-auto">
          <QuoteGenerator locale={locale} />
        </div>
      </div>
    </section>
  );
}
