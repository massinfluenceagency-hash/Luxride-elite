import Image from "next/image";
import { Vehicle } from "@/types/vehicle";
export default function VehicleGallery({vehicle}:{vehicle:Vehicle}) {
  if(vehicle.gallery.length<2) return null;
  return <div className="mt-4"><p className="text-cream/60 text-sm mb-3">More vehicle photos · Confirm your preferred color and configuration when requesting availability.</p><div className="grid grid-cols-2 gap-3">{vehicle.gallery.map((src,index)=><a key={src} href={src} target="_blank" rel="noreferrer" aria-label={`Open ${vehicle.name} photo ${index+1}`} className="relative block aspect-[1.346] overflow-hidden rounded-xl border border-gold/20"><Image src={src} alt={`${vehicle.name}, option ${index+1}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" style={{objectPosition:'50% 70%'}}/></a>)}</div></div>;
}
