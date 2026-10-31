import { pageMetadata } from "@/lib/utils/pageMetadata";
import { setRequestLocale } from "next-intl/server";
import FleetListing from "@/components/fleet/FleetListing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/fleet", "Luxury Vehicles in Miami", "Explore 18 luxury SUV, sports car, and exotic rental models in Miami. View daily rates and request availability.");
}

export default async function FleetPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  const initialCategory = typeof category === "string" && ["limousines", "suvs", "exotic"].includes(category) ? category : "all";
  return <FleetListing key={initialCategory} locale={locale} initialCategory={initialCategory} />;
}
