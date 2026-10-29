import { pageMetadata } from "@/lib/utils/pageMetadata";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Clock, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";



const TEAM = [
  { name: "Brian", role: "Co-Founder" },
  { name: "Franklin", role: "Co-Founder" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/about", "About LuxRide Elite", "Learn about LuxRide Elite transportation services in Miami and South Florida. Plan airport pickups, private rides, celebrations, and sightseeing.");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        {/* Hero */}
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=60')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-black" />
          <div className="container-luxe relative z-10 text-center">
            <SectionHeading as="h1"
              label="Our Story"
              title="Where Luxury Meets the Road"
              subtitle="Luxury vehicles and chauffeur service for your plans in Miami and South Florida"
            />
          </div>
        </div>

        {/* Story */}
        <section className="section-padding">
          <div className="container-luxe">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Our History</p>
                <h2 className="font-display font-black text-4xl text-white mb-6">Born from a Passion for Perfection</h2>
                <div className="space-y-4 text-cream/60 leading-relaxed">
                  <p>LuxRide Elite was founded with a singular vision: to redefine what luxury transportation means in Miami. We believed that getting from point A to point B should be an experience in itself — not just a means to an end.</p>
                  <p>Choose from the vehicles and services listed on our website. Share your itinerary, passenger count, and preferred vehicle so our team can confirm availability and the right arrangement for your trip.</p>
                  <p>From airport pickups and business trips to celebrations and private sightseeing, we help you plan the transportation details. Activities and third-party services are arranged and paid for separately.</p>
                </div>
                <Link
                  href={`/${locale}/quote`}
                  className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-8 py-3.5 rounded-full hover:shadow-gold transition-all duration-300 mt-8"
                >
                  Experience It Yourself
                </Link>
              </div>
              <div className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
                  alt="Luxury car illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-black-charcoal/30 border-t border-gold/10">
          <div className="container-luxe">
            <SectionHeading label="What Drives Us" title="Our Core Values" subtitle="" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Discretion", desc: "Your privacy is paramount. We treat every client with absolute confidentiality and professionalism." },
                { title: "Punctuality", desc: "We understand that your time is invaluable. Share your schedule and flight information so we can plan your pickup." },
                { title: "Excellence", desc: "From the condition of our vehicles to the presentation of our chauffeurs — every detail matters." },
              ].map(({ title, desc }) => (
                <GlassCard key={title} className="p-8 text-center">
                  <div className="w-14 h-14 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mx-auto mb-6">
                    <div className="w-5 h-5 rounded-full bg-gold" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">{title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding">
          <div className="container-luxe">
            <SectionHeading label="The Team" title="Meet Our Founders" subtitle="The people behind Miami's premier luxury transportation service" />
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-xl mx-auto">
              {TEAM.map(({ name, role }) => (
                <div key={name} className="text-center flex-1">
                  <div className="w-24 h-24 rounded-full border-2 border-gold/30 bg-gold/5 flex items-center justify-center mx-auto mb-4">
                    <span className="font-display font-black text-2xl text-gold">
                      {name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-white text-lg">{name}</h4>
                  <p className="text-gold text-sm">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
