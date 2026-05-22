"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VehicleCard from "@/components/fleet/VehicleCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { vehicles } from "@/lib/data/fleet";

const CATEGORIES = ["all", "limousines", "suvs", "exotic"] as const;

export default function FleetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations("fleet");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all" ? vehicles : vehicles.filter((v) => v.category === activeCategory);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        {/* Hero */}
        <div className="relative py-20 bg-black-charcoal border-b border-gold/20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&q=60')] bg-cover bg-center opacity-10" />
          <div className="container-luxe relative z-10 text-center">
            <SectionHeading
              label="Our Fleet"
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="sticky top-20 z-30 bg-black/95 backdrop-blur-md border-b border-gold/20 py-4">
          <div className="container-luxe">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-none px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-gold text-black"
                      : "border border-white/10 text-cream/60 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="section-padding">
          <div className="container-luxe">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
