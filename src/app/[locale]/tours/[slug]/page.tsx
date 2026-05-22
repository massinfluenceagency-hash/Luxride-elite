import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Users, CheckCircle, ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { getTourBySlug } from "@/lib/data/tours";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import TourBookingForm from "@/components/tours/TourBookingForm";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        <div className="container-luxe py-4">
          <Link href={`/${locale}/tours`} className="flex items-center gap-2 text-cream/50 hover:text-gold text-sm transition-colors">
            <ArrowLeft size={14} /> Back to Tours
          </Link>
        </div>

        {/* Hero */}
        <div className="relative h-[50vh] overflow-hidden">
          <Image src={tour.image} alt={tour.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-10 inset-x-0 container-luxe">
            <div className="flex items-center gap-4 mb-3 text-cream/70 text-sm">
              <span className="flex items-center gap-1.5"><Clock size={13} className="text-gold" />{tour.duration}</span>
              <span className="flex items-center gap-1.5"><Users size={13} className="text-gold" />{tour.minPersons}–{tour.maxPersons} persons</span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl text-white">{tour.title}</h1>
          </div>
        </div>

        <div className="container-luxe py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left col */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <p className="text-cream/70 text-lg leading-relaxed">{tour.longDescription}</p>
              </div>

              {/* Highlights */}
              <GlassCard className="p-6">
                <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">Tour Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 text-cream/70 text-sm">
                      <CheckCircle size={14} className="text-gold flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Includes */}
              <GlassCard className="p-6">
                <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">What&apos;s Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.includes.map((i) => (
                    <li key={i} className="flex items-center gap-3 text-cream/70 text-sm">
                      <CheckCircle size={14} className="text-gold flex-shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Itinerary */}
              <div>
                <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-6">Tour Itinerary</h3>
                <div className="relative pl-8">
                  {tour.itinerary.map((stop, i) => (
                    <div key={i} className="relative pb-8 last:pb-0">
                      {i < tour.itinerary.length - 1 && (
                        <div className="absolute left-[-21px] top-6 bottom-0 w-px bg-gold/20" />
                      )}
                      <div className="absolute left-[-28px] top-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="text-gold font-mono text-xs bg-gold/10 border border-gold/20 rounded-full px-3 py-1 flex-shrink-0">
                          {stop.time}
                        </div>
                        <div>
                          <div className="text-white font-semibold mb-1 flex items-center gap-2">
                            <MapPin size={13} className="text-gold" /> {stop.location}
                          </div>
                          <div className="text-cream/50 text-sm">{stop.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col: booking */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <GlassCard glow className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-gold font-display font-black text-4xl">{formatCurrency(tour.pricePerPerson)}</div>
                    <div className="text-cream/40 text-sm">per person</div>
                  </div>
                  <TourBookingForm tour={tour} locale={locale} />
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
