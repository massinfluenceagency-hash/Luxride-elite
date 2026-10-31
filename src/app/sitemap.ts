import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { vehicles } from "@/lib/data/fleet";
import { tours } from "@/lib/data/tours";

const origin = "https://www.luxrideelite.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/about", "/contact", "/chauffeur", "/fleet", "/exotic", "/tours", "/yachts", "/quote", "/booking", "/privacy", "/terms",
    ...vehicles.map((vehicle) => `/fleet/${vehicle.category}/${vehicle.id}`),
    ...tours.map((tour) => `/tours/${tour.slug}`),
  ];
  return paths.flatMap((path) => routing.locales.map((locale) => ({
    url: `${origin}/${locale}${path}`,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((language) => [language, `${origin}/${language}${path}`])),
    },
  })));
}
