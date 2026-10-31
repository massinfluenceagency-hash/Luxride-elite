import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import YachtCharters from "@/components/yachts/YachtCharters";
import { pageMetadata } from "@/lib/utils/pageMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/yachts", "Private Yacht Charters", "Explore six yachts from 46 to 110 feet. Four-hour charters for up to 13 guests. Request availability and a personalized charter quote.");
}
export default async function YachtsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <><Navbar locale={locale} /><main className="min-h-screen pt-24">
    <section className="relative overflow-hidden border-b border-gold/20 min-h-[420px] flex items-center">
      <Image src="/images/yachts/azimut-86s-1.webp" alt="Azimut yacht on the water" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="container-luxe relative py-20"><p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">LuxRide Elite · On the Water</p><h1 className="font-display text-white text-4xl sm:text-6xl font-bold max-w-2xl">Your Private Escape<br />Starts Here</h1><p className="text-cream/80 max-w-xl mt-6 text-lg">Explore our yacht charter collection, from 46 to 110 feet. Plan four hours on the water with up to 13 guests.</p><a href="#charter-request" className="inline-block bg-gold-gradient text-black font-semibold px-7 py-3.5 rounded-full mt-7">Request a Charter Quote</a></div>
    </section>
    <YachtCharters />
  </main><Footer locale={locale} /></>;
}
