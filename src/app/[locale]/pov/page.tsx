import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import POVSceneClient from "@/components/pov/POVSceneClient";
import POVVideoSection from "@/components/pov/POVVideoSection";

export default async function POVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        {/* Header */}
        <div className="py-16 text-center border-b border-gold/20">
          <div className="container-luxe">
            <SectionHeading
              label="Immersive Experience"
              title="Experience the Ride"
              subtitle="Step inside our vehicles before you book — interactive 360° POV simulation powered by WebGL"
            />
          </div>
        </div>

        {/* 3D POV Section */}
        <section className="py-16">
          <div className="container-luxe">
            <div className="text-center mb-8">
              <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">Interactive 3D</p>
              <h2 className="font-display font-bold text-3xl text-white">Explore the Interior</h2>
              <p className="text-cream/50 mt-2 text-sm">Click a vehicle below, then drag to look around in 360°</p>
            </div>
            <POVSceneClient />
          </div>
        </section>

        {/* 360° Video Section */}
        <section className="py-16 bg-black-charcoal/30 border-t border-gold/10">
          <div className="container-luxe">
            <SectionHeading
              label="Video Tours"
              title="360° POV Video Experiences"
              subtitle="Click any video to watch an immersive first-person tour of our luxury vehicles"
            />
            <POVVideoSection />
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container-luxe">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Interactive 3D Interior", desc: "Real-time WebGL rendering of our luxury vehicle interiors — drag to explore every angle." },
                { title: "360° Video Experience", desc: "First-person POV videos of luxury vehicle interiors. Click any thumbnail to play." },
                { title: "Pre-Booking Confidence", desc: "Know exactly what you're stepping into before you book — no surprises, just luxury." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-black-charcoal/50 border border-gold/20 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                    <div className="w-4 h-4 rounded-full bg-gold" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-cream/50 text-sm">{desc}</p>
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
