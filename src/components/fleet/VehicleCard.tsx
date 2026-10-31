import Link from 'next/link';
import { Vehicle } from '@/types/vehicle';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import GlassCard from '@/components/ui/GlassCard';
import VehiclePhoto from './VehiclePhoto';
export default function VehicleCard({vehicle,locale}:{vehicle:Vehicle;locale:string}) {
return <Link href={`/${locale}/fleet/${vehicle.category}/${vehicle.id}`} className="block h-full"><GlassCard hover className="overflow-hidden h-full flex flex-col"><div className="relative aspect-[1.346] overflow-hidden"><VehiclePhoto vehicle={vehicle}/></div><div className="p-6 flex flex-col flex-1"><h3 className="font-display font-bold text-xl text-white">{vehicle.name}</h3><p className="text-cream/50 text-sm mt-2 mb-5">Daily rental · Chauffeur not included</p><div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center gap-3"><div><span className="text-gold font-display font-bold text-2xl">{formatCurrency(vehicle.dailyRate!)}</span><span className="text-cream/50 text-sm"> /day</span></div><span className="text-gold text-sm font-semibold">View & request →</span></div></div></GlassCard></Link>;
}
