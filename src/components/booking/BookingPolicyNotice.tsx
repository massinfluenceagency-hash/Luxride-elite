import Link from "next/link";
import { CHAUFFEUR_DEPOSIT_NOTICE, CHAUFFEUR_CANCELLATION_NOTICE } from "@/lib/data/bookingPolicies";

export default function BookingPolicyNotice({ locale }: { locale: string }) {
  return <aside className="rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm space-y-3">
    <h2 className="text-gold font-semibold">Chauffeur deposit & cancellation</h2>
    <p className="text-cream/80">{CHAUFFEUR_DEPOSIT_NOTICE}</p>
    <p className="text-cream/70">{CHAUFFEUR_CANCELLATION_NOTICE}</p>
    <Link className="inline-block text-gold underline underline-offset-4" href={`/${locale}/terms`}>Read booking terms</Link>
  </aside>;
}
