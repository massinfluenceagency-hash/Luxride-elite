import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewCarousel from "@/components/reviews/ReviewCarousel";

export default function TestimonialsSection() {
  const t = useTranslations("reviews");

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-luxe">
        <SectionHeading
          label="Testimonials"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ReviewCarousel />
      </div>
    </section>
  );
}
