"use client";
import { useId, useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { submitRequest } from "@/lib/utils/submitRequest";
import { formatCurrency } from "@/lib/utils/formatCurrency";
export default function RentalInquiry({ vehicle }: { vehicle: Vehicle }) {
  const id = useId();
  const [form, setForm] = useState({name:"",email:"",phone:"",date:"",days:1,requests:""});
  const [sending,setSending]=useState(false), [sent,setSent]=useState(false), [error,setError]=useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if(sending) return; setSending(true);setError("");
    try {await submitRequest({type:"rental",vehicleId:vehicle.id,...form});setSent(true);} catch(e) {setError(e instanceof Error?e.message:"Unable to send. Please call us.");} finally {setSending(false);}
  }
  if(sent) return <div role="status" className="p-8 rounded-2xl border border-gold/30"><h2 className="text-white font-display text-2xl">Rental request sent</h2><p className="text-cream/70 mt-3">Our team will confirm the vehicle, availability, rental terms, and final price with you. Your reservation is not confirmed yet.</p></div>;
  const input="w-full bg-black-soft border border-white/20 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none";
  return <form onSubmit={submit} className="p-6 sm:p-8 rounded-2xl border border-gold/20 space-y-5">
    <h2 className="font-display text-2xl font-bold text-white">Request this rental</h2>
    <p className="text-cream/60 text-sm">{formatCurrency(vehicle.dailyRate!)} per day · Vehicle rental only. Chauffeur not included.</p>
    <div className="grid sm:grid-cols-2 gap-5">{([
      ["name","Full name","text"],["email","Email","email"],["phone","Phone","tel"],["date","Pickup date","date"],
    ] as const).map(([key,label,type])=><div key={key}><label htmlFor={`${id}-${key}`} className="block text-gold text-sm mb-2">{label}</label><input id={`${id}-${key}`} type={type} required maxLength={key==="email"?254:key==="name"?120:40} autoComplete={key==="date"?undefined:key==="phone"?"tel":key} className={input} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></div>)}</div>
    <div><label htmlFor={`${id}-days`} className="block text-gold text-sm mb-2">Rental days</label><input id={`${id}-days`} className={input} type="number" required min={1} max={30} step={1} value={form.days} onChange={e=>setForm({...form,days:e.target.valueAsNumber})}/></div>
    <div><label htmlFor={`${id}-requests`} className="block text-gold text-sm mb-2">Preferred year, configuration, pickup location, or questions</label><textarea id={`${id}-requests`} rows={3} maxLength={5000} className={input} value={form.requests} onChange={e=>setForm({...form,requests:e.target.value})}/></div>
    <p className="text-gold font-semibold">Base rental estimate: {formatCurrency(vehicle.dailyRate!*(Number.isFinite(form.days)?form.days:0))}</p>
    <p className="text-cream/60 text-sm">Availability and the specific vehicle must be confirmed. Taxes, deposit, insurance requirements, mileage allowance, and delivery charges, if applicable, will be confirmed before you reserve.</p>
    {error&&<p role="alert" className="text-red-400">{error}</p>}
    <button disabled={sending} className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl disabled:opacity-60">{sending?"Sending…":"Request availability"}</button>
  </form>;
}
