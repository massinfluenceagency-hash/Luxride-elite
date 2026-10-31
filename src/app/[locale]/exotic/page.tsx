import { pageMetadata } from '@/lib/utils/pageMetadata';
import { setRequestLocale } from 'next-intl/server';
import FleetListing from '@/components/fleet/FleetListing';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;return pageMetadata(locale,'/exotic','Luxury & Exotic Car Rentals in Miami','Browse our luxury and exotic rental models, daily rates, and request availability.');}
export default async function ExoticPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;setRequestLocale(locale);return <FleetListing locale={locale} initialCategory="all"/>;}
