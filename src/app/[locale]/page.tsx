import { pageMetadata } from "@/lib/utils/pageMetadata";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import BookingFAQ from "@/components/home/BookingFAQ";
import ServicesGrid from "@/components/home/ServicesGrid";
import FleetPreview from "@/components/home/FleetPreview";
import ToursPreview from "@/components/home/ToursPreview";
import CTASection from "@/components/home/CTASection";
import QuoteSection from "@/components/home/QuoteSection";
import ExoticPreview from "@/components/home/ExoticPreview";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "", "Miami Luxury Car & Chauffeur Service", "Request Miami airport transportation, private chauffeur service, limousines, and sightseeing time packages. Availability and final pricing confirmed by our team.");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <ServicesGrid locale={locale} />
        <FleetPreview locale={locale} />
        <QuoteSection locale={locale} />
        <ToursPreview locale={locale} />
        <ExoticPreview locale={locale} />
        <BookingFAQ locale={locale} />
        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
