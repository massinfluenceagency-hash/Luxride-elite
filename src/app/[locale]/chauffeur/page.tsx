import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/home/ServicesGrid";
import ChauffeurFleet from "@/components/home/ChauffeurFleet";
import QuoteSection from "@/components/home/QuoteSection";
import BookingFAQ from "@/components/home/BookingFAQ";
import { pageMetadata } from "@/lib/utils/pageMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/chauffeur", "Miami Black SUV & Limo Service", "Chauffeured Chevrolet Suburban and Cadillac Escalade service for Miami and Fort Lauderdale airport pickups, point-to-point transfers, hourly rides, and events.");
}
export default async function ChauffeurPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <><Navbar locale={locale} /><main className="pt-24">
    <section className="relative overflow-hidden py-24"><Image src="/images/fleet/real/suburban-suv.webp" alt="Black Chevrolet Suburban for chauffeured service" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center 52%" }} /><div className="absolute inset-0 bg-black/70" /><div className="container-luxe relative"><p className="text-gold uppercase tracking-widest text-sm mb-4">Vehicle & Professional Chauffeur</p><h1 className="font-display font-bold text-white text-4xl sm:text-6xl max-w-3xl">Miami Black SUV<br />& Limo Service</h1><p className="text-cream/80 text-lg max-w-2xl mt-6">Airport pickups. Private drop-offs. A driver by the hour. Ride in a Suburban or Escalade and let us handle the driving.</p><div className="flex flex-wrap gap-4 mt-8"><Link href={`/${locale}/booking`} className="bg-gold-gradient text-black font-semibold px-7 py-3 rounded-full">Request a Chauffeur Ride</Link><a href="tel:+18002404727" className="border border-gold/50 text-gold px-7 py-3 rounded-full">Call 1 (800) 240-4727</a></div></div></section>
    <ServicesGrid locale={locale} /><QuoteSection locale={locale} /><ChauffeurFleet locale={locale} /><BookingFAQ locale={locale} />
  </main><Footer locale={locale} /></>;
}
