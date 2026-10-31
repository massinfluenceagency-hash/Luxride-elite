import { pageMetadata } from "@/lib/utils/pageMetadata";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import BookingFAQ from "@/components/home/BookingFAQ";
import ServicesGrid from "@/components/home/ServicesGrid";
import ChauffeurFleet from "@/components/home/ChauffeurFleet";
import MoreExperiences from "@/components/home/MoreExperiences";
import CTASection from "@/components/home/CTASection";
import QuoteSection from "@/components/home/QuoteSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "", "Miami Black SUV & Limo Service", "Chauffeured Suburban and Escalade rides in Miami and South Florida. Request airport pickups, private transfers, hourly black SUV service, and event transportation.");
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
        <QuoteSection locale={locale} />
        <ChauffeurFleet locale={locale} />
        <BookingFAQ locale={locale} />
        <CTASection locale={locale} />
        <MoreExperiences locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
