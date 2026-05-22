import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import POVSceneClient from "@/components/pov/POVSceneClient";

const YOUTUBE_VIDEOS = [
  {
    title: "Limousine Night Ride POV — Miami Beach",
    id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  },
  {
    title: "Exotic Car Drive POV — Lamborghini",
    id: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1555626906-fcf10d6851b4?w=800&q=80",
  },
];

export default async function POVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
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
            <POVSceneClient />
          </div>
        </section>

        {/* 360° Video Section */}
        <section className="py-16 bg-black-charcoal/30 border-t border-gold/10">
          <div className="container-luxe">
            <SectionHeading
              label="Video Tours"
              title="360° POV Video Experiences"
              subtitle="Immersive first-person video tours — click and drag to look around"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {YOUTUBE_VIDEOS.map((video) => (
                <div key={video.id + video.title} className="rounded-2xl overflow-hidden border border-gold/20 group">
                  <div className="relative aspect-video bg-black-charcoal">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-60"
                      style={{ backgroundImage: `url(${video.thumbnail})` }}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-b-[12px] border-l-gold border-t-transparent border-b-transparent ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-semibold text-sm">{video.title}</span>
                      <div className="text-gold/60 text-xs mt-1 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        360° Interactive Video
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container-luxe">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Interactive 3D Interior", desc: "Real-time WebGL rendering of our luxury vehicle interiors. Drag to pan, explore every detail." },
                { title: "360° Video Experience", desc: "First-person POV videos of our actual vehicles on Miami's most scenic routes." },
                { title: "Pre-Booking Confidence", desc: "Know exactly what you're getting before you book — no surprises, just luxury." },
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
