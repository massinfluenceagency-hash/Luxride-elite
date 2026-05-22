import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: 500, suffix: "+", key: "clients" },
  { value: 15, suffix: "+", key: "vehicles" },
  { value: 10, suffix: "", key: "years" },
  { value: 24, suffix: "/7", key: "service" },
];

export default function StatsBar() {
  const t = useTranslations("stats");

  return (
    <section className="bg-gold-gradient py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map(({ value, suffix, key }) => (
            <div key={key} className="text-center">
              <div className="font-display font-black text-4xl md:text-5xl text-black">
                <AnimatedCounter end={value} suffix={suffix} />
              </div>
              <div className="text-black/70 text-sm font-semibold mt-1 tracking-wide uppercase">
                {t(key)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
