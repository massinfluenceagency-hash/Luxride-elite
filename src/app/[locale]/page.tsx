import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import FleetPreview from "@/components/home/FleetPreview";
import ToursPreview from "@/components/home/ToursPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import QuoteSection from "@/components/home/QuoteSection";
import ExoticPreview from "@/components/home/ExoticPreview";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <StatsBar />
        <ServicesGrid locale={locale} />
        <FleetPreview locale={locale} />
        <QuoteSection locale={locale} />
        <ToursPreview locale={locale} />
        <ExoticPreview locale={locale} />
        <TestimonialsSection />
        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
