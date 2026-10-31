import { getImageProps } from 'next/image';
import { Vehicle } from '@/types/vehicle';

export default function VehiclePhoto({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) {
  if (!vehicle.image) return <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black-charcoal to-black border-b border-gold/10 px-6 text-center"><span className="text-gold/60 text-xs uppercase tracking-[0.25em] mb-3">{vehicle.specs.make}</span><span className="font-display text-2xl text-cream/80">{vehicle.specs.model}</span><span className="text-cream/40 text-xs mt-3">Request vehicle photos</span></div>;
  const { props } = getImageProps({ src: vehicle.image, alt: vehicle.name, width: 942, height: 2048, priority, quality: 85 });
  return <svg role="img" aria-label={vehicle.name} viewBox="0 820 942 700" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full bg-black-charcoal"><image href={props.src} width="942" height="2048" /></svg>;
}
