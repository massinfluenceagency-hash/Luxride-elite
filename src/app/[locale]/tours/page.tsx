import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/tours/TourCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { tours } from "@/lib/data/tours";

function ToursContent({ locale }: { locale: string }) {
  const t = useTranslations("tours");
  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=1920&q=60')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <div className="container-luxe relative z-10 text-center">
            <SectionHeading
              label="Miami Experiences"
              title={t("title")}
              subtitle={t("subtitle")}
            />
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-2xl px-8 py-5">
                <div className="w-1.5 h-10 bg-gold-gradient rounded-full flex-shrink-0" />
                <p className="text-cream/90 text-base md:text-lg leading-relaxed text-left">
                  All of our tour experiences are{" "}
                  <span className="text-gold font-semibold">fully customizable</span> and designed
                  to be mixed and matched — curate your perfect Miami itinerary by combining any
                  destinations, attractions, or activities across our catalog. Every detail is
                  tailored exclusively to you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="section-padding">
          <div className="container-luxe">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} locale={locale} />
              ))}
            </div>
            <p className="text-cream/30 text-xs text-center mt-8">
              * Quoted rates cover luxury transportation and professional guide services only.
              Admission fees, activity costs, meals, and gratuities are not included and are the responsibility of the guest.
            </p>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ToursContent locale={locale} />;
}
