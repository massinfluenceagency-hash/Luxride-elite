import Link from "next/link";
import { CHAUFFEUR_DEPOSIT_NOTICE, CHAUFFEUR_CANCELLATION_NOTICE } from "@/lib/data/bookingPolicies";
export default function BookingPolicyNotice({ locale, expanded = false }: { locale: string; expanded?: boolean }) {
  const content = <div className="text-sm space-y-3 pt-3"><p className="text-cream/80">{CHAUFFEUR_DEPOSIT_NOTICE}</p><p className="text-cream/80">{CHAUFFEUR_CANCELLATION_NOTICE}</p><Link className="inline-block text-gold underline underline-offset-4 py-2" href={`/${locale}/terms`}>Read booking terms</Link></div>;
  return expanded ? <aside className="rounded-xl border border-gold/30 bg-gold/5 p-5"><h2 className="text-gold font-semibold">Chauffeur deposit & cancellation</h2>{content}</aside> : <details className="rounded-xl border border-gold/30 bg-gold/5 px-4"><summary className="text-gold font-semibold cursor-pointer py-4">Deposit & cancellation details</summary>{content}</details>;
}
