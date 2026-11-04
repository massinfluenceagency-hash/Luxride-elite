"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
export default function MobileBookingBar({locale}:{locale:string}) {
  const pathname=usePathname();
  if (/\/(booking|quote)(\/|$)/.test(pathname)) return null;
  return <div className="sm:hidden"><div aria-hidden="true" className="h-24"/><nav aria-label="Quick booking" className="fixed bottom-0 inset-x-0 z-40 border-t border-gold/30 bg-black p-3 flex gap-3" style={{paddingBottom:"max(12px, env(safe-area-inset-bottom))"}}><a href="tel:+18002404727" className="flex items-center justify-center gap-2 border border-gold/50 text-gold rounded-xl px-5 py-3 font-semibold"><Phone size={18}/>Call</a><Link href={`/${locale}/booking`} className="flex-1 text-center bg-gold-gradient text-black rounded-xl py-3 font-bold">Request a Ride</Link></nav></div>;
}
