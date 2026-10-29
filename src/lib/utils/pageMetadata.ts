import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function pageMetadata(locale: string, path: string, title: string, description: string): Metadata {
  const origin = "https://www.luxrideelite.com";
  return {
    title, description,
    alternates: {
      canonical: `${origin}/${locale}${path}`,
      languages: Object.fromEntries(routing.locales.map(language => [language, `${origin}/${language}${path}`])),
    },
    openGraph: { title: `${title} | LuxRide Elite`, description, url: `${origin}/${locale}${path}`, type: "website" },
  };
}
