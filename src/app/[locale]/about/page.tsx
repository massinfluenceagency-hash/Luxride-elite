import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Clock, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const STATS = [
  { Icon: Users, value: "500+", label: "Satisfied Clients" },
  { Icon: Award, value: "10+", label: "Years of Excellence" },
  { Icon: Star, value: "4.9★", label: "Average Rating" },
  { Icon: Clock, value: "24/7", label: "Always Available" },
];

const TEAM = [
  { name: "Marcus Rivera", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Diana Chen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80" },
  { name: "James Wellington", role: "Fleet Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

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
            <SectionHeading
              label="Our Story"
              title="Where Luxury Meets the Road"
              subtitle="A decade of defining Miami's premium transportation experience — built on trust, crafted for excellence"
            />
          </div>
        </div>

        {/* Stats */}
        <section className="py-12 border-y border-gold/10 bg-black-charcoal/30">
          <div className="container-luxe">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map(({ Icon, value, label }) => (
                <div key={label} className="text-center">
                  <Icon size={24} className="text-gold mx-auto mb-3" />
                  <div className="font-display font-black text-3xl text-gold mb-1">{value}</div>
                  <div className="text-cream/50 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding">
          <div className="container-luxe">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Our History</p>
                <h2 className="font-display font-black text-4xl text-white mb-6">Born from a Passion for Perfection</h2>
                <div className="space-y-4 text-cream/60 leading-relaxed">
                  <p>LuxRide Elite was founded in 2014 with a singular vision: to redefine what luxury transportation means in Miami. We believed that getting from point A to point B should be an experience in itself — not just a means to an end.</p>
                  <p>Starting with a single stretch limousine and an unwavering commitment to excellence, we have grown into Miami's most trusted luxury transportation company, with a fleet of over 15 world-class vehicles and a team of highly trained professional chauffeurs.</p>
                  <p>Today, we serve discerning clients who expect nothing less than the absolute best — from Fortune 500 executives and celebrities to couples celebrating their most special moments. Every ride is approached with the same meticulous attention to detail that has defined our reputation.</p>
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
                  alt="LuxRide Elite fleet"
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
                { title: "Punctuality", desc: "We understand that your time is invaluable. Our chauffeurs are always early — never late." },
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
            <SectionHeading label="The Team" title="Meet Our Leadership" subtitle="The people behind Miami's premier luxury transportation service" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {TEAM.map(({ name, role, image }) => (
                <div key={name} className="text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold/30 mx-auto mb-4">
                    <Image src={image} alt={name} fill className="object-cover" sizes="128px" />
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
