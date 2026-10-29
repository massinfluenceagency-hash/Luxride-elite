import { setRequestLocale } from "next-intl/server";
import { vehicles } from "@/lib/data/fleet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteGenerator from "@/components/quote/QuoteGenerator";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function QuotePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ vehicle?: string | string[] }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { vehicle } = await searchParams;
  const initialVehicleId = vehicles.find((item) => item.id === vehicle)?.id;

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&q=60')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
          </div>
          <div className="container-luxe relative z-10 text-center">
            <SectionHeading
              label="Transparent Pricing"
              title="Get Your Instant Quote"
              subtitle="Real-time pricing based on your route, vehicle, and schedule. No hidden fees."
            />
          </div>
        </div>

        <section className="pb-24">
          <div className="container-luxe">
            <div className="max-w-4xl mx-auto">
              <QuoteGenerator key={initialVehicleId} locale={locale} initialVehicleId={initialVehicleId} />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
