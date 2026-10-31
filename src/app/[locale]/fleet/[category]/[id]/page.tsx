import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VehicleGallery from '@/components/fleet/VehicleGallery';
import VehiclePhoto from '@/components/fleet/VehiclePhoto';
import VehicleCard from '@/components/fleet/VehicleCard';
import RentalInquiry from '@/components/fleet/RentalInquiry';
import { getVehicleById, vehicles } from '@/lib/data/fleet';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { pageMetadata } from '@/lib/utils/pageMetadata';
export async function generateMetadata({params}:{params:Promise<{locale:string;category:string;id:string}>}) {
  const {locale,category,id}=await params;const vehicle=getVehicleById(id);
  if(!vehicle) return {};
  return pageMetadata(locale,`/fleet/${category}/${id}`,`${vehicle.name} Rental in Miami`,`${vehicle.name}: ${formatCurrency(vehicle.dailyRate!)} per day. Request availability, preferred year, and configuration.`);
}
export default async function VehicleDetailPage({params}:{params:Promise<{locale:string;category:string;id:string}>}) {
 const {locale,category,id}=await params;const vehicle=getVehicleById(id);
 if(!vehicle||vehicle.category!==category) notFound();
 const related=vehicles.filter(v=>v.category===vehicle.category&&v.id!==id).slice(0,3);
 return <><Navbar locale={locale}/><main className="min-h-screen pt-24"><div className="container-luxe py-6"><Link href={`/${locale}/fleet`} className="text-gold text-sm">← Back to fleet</Link></div>
 <div className="container-luxe pb-16"><div className="grid lg:grid-cols-2 gap-10 items-start"><div><div className="relative aspect-[1.346] overflow-hidden rounded-2xl border border-gold/20"><VehiclePhoto vehicle={vehicle} priority/></div><VehicleGallery vehicle={vehicle}/><h1 className="text-white font-display font-bold text-3xl sm:text-4xl mt-8">{vehicle.name}</h1><p className="text-gold font-display text-3xl mt-4">{formatCurrency(vehicle.dailyRate!)} <span className="text-cream/50 text-lg">/day</span></p><p className="text-cream/60 mt-4">Daily vehicle rental. Choose your preferred year and configuration when you inquire; our team will confirm the specific vehicle for your dates.</p><p className="text-cream/50 mt-4 text-sm">Chauffeur service is separate from this daily rental price.</p>{vehicle.chauffeurAvailable&&<Link href={`/${locale}/quote?vehicle=${vehicle.id}`} className="inline-block text-gold underline mt-5">Need a chauffeur? Get a service quote</Link>}</div><RentalInquiry vehicle={vehicle}/></div>
 {related.length>0&&<section className="mt-16"><h2 className="text-white font-display text-2xl mb-6">Explore more models</h2><div className="grid md:grid-cols-3 gap-6">{related.map(v=><VehicleCard key={v.id} vehicle={v} locale={locale}/>)}</div></section>}</div></main><Footer locale={locale}/></>;
}
