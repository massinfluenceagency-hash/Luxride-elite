import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import VehicleCard from '@/components/fleet/VehicleCard';
import { vehicles } from '@/lib/data/fleet';
export default function ExoticPreview({locale}:{locale:string}) { return <section className="section-padding"><div className="container-luxe"><SectionHeading label="Luxury Car Rental" title="Drive the Extraordinary" subtitle="Explore our daily rental collection. Choose your model and request availability."/><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{vehicles.filter(v=>v.category === "exotic" && v.image).slice(0,3).map(v=><VehicleCard key={v.id} vehicle={v} locale={locale}/>)}</div><div className="text-center mt-10"><Link className="text-gold font-semibold" href={`/${locale}/fleet`}>Explore all 17 models →</Link></div></div></section>; }
