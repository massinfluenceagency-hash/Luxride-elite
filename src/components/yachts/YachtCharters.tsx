"use client";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { yachts, CHARTER_HOURS, MAX_CHARTER_GUESTS } from "@/lib/data/yachts";
import { submitRequest } from "@/lib/utils/submitRequest";

export default function YachtCharters() {
  const id = useId();
  const selectRef = useRef<HTMLSelectElement>(null);
  const [form, setForm] = useState({ yachtId: "", name: "", email: "", phone: "", date: "", guests: 2, requests: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function chooseYacht(yachtId: string) {
    setForm(current => ({ ...current, yachtId }));
    setSent(false);
    selectRef.current?.focus({ preventScroll: true });
    document.getElementById("charter-request")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setSending(true); setError("");
    try { await submitRequest({ type: "yacht", ...form }); setSent(true); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to send your request. Please try again or call us."); }
    finally { setSending(false); }
  }
  const inputClass = "w-full bg-black-soft border border-white/20 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none";
  return <>
    <section aria-label="Yacht collection" className="container-luxe py-14">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        {yachts.map(yacht => <article key={yacht.id} className="rounded-2xl border border-gold/20 bg-black-charcoal overflow-hidden flex flex-col">
          <div className="relative aspect-[16/10] bg-black"><Image src={yacht.images[0]} alt={yacht.name} fill sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw" className="object-contain" /></div>
          <div className="p-6 flex flex-col flex-1">
            <h2 className="text-white font-display font-bold text-2xl">{yacht.name}</h2>
            <p className="text-gold text-sm mt-3">{CHARTER_HOURS}-hour charter · Up to {MAX_CHARTER_GUESTS} guests</p>
            <p className="text-cream/60 text-sm mt-3">Share your date and plans for availability, departure details, and a personalized charter quote.</p>
            <details className="mt-5 mb-6"><summary className="text-cream/80 text-sm cursor-pointer focus-visible:outline-gold">View more photos</summary><a href={yacht.images[1]} target="_blank" rel="noreferrer" aria-label={`Open another photo of ${yacht.name}`} className="relative block aspect-[4/3] mt-3 rounded-xl overflow-hidden bg-black"><Image src={yacht.images[1]} alt={`${yacht.name}, additional view`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-contain" /></a></details>
            <button onClick={() => chooseYacht(yacht.id)} className="mt-auto w-full bg-gold-gradient text-black font-semibold rounded-xl px-5 py-3" aria-label={`Request a quote for ${yacht.name}`}>Request a Quote</button>
          </div>
        </article>)}
      </div>
    </section>
    <section id="charter-request" className="container-luxe pb-20 scroll-mt-28">
      <div className="max-w-3xl mx-auto rounded-2xl border border-gold/25 bg-black-charcoal p-6 sm:p-10">
        <h2 className="font-display text-white text-3xl font-bold">Plan Your Yacht Charter</h2>
        <p className="text-cream/60 mt-3 mb-7">Tell us your preferred yacht, date, and group size. Each charter is {CHARTER_HOURS} hours for up to {MAX_CHARTER_GUESTS} guests.</p>
        {sent ? <div role="status"><h3 className="text-gold font-semibold text-xl">Your charter inquiry has been sent</h3><p className="text-cream/70 mt-3">Our team will confirm availability, the departure marina, pricing, and what is included. Your reservation is not confirmed yet.</p><button onClick={() => setSent(false)} className="text-gold underline mt-5">Send another inquiry</button></div> : <form onSubmit={submit} className="space-y-5">
          <div><label htmlFor={`${id}-yacht`} className="block text-gold text-sm mb-2">Preferred yacht</label><select ref={selectRef} id={`${id}-yacht`} required className={inputClass} value={form.yachtId} onChange={e => setForm({ ...form, yachtId: e.target.value })}><option value="">Choose a yacht</option>{yachts.map(yacht => <option key={yacht.id} value={yacht.id}>{yacht.name}</option>)}</select></div>
          <div className="grid sm:grid-cols-2 gap-5">{([
            ["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"], ["date", "Preferred date", "date"],
          ] as const).map(([key, label, type]) => <div key={key}><label htmlFor={`${id}-${key}`} className="block text-gold text-sm mb-2">{label}</label><input id={`${id}-${key}`} required type={type} maxLength={key === "email" ? 254 : key === "name" ? 120 : 40} autoComplete={key === "date" ? undefined : key === "phone" ? "tel" : key} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className={inputClass} /></div>)}</div>
          <div><label htmlFor={`${id}-guests`} className="block text-gold text-sm mb-2">Number of guests (maximum {MAX_CHARTER_GUESTS})</label><input id={`${id}-guests`} required type="number" min={1} max={MAX_CHARTER_GUESTS} step={1} value={form.guests} onChange={e => setForm({ ...form, guests: e.target.valueAsNumber })} className={inputClass} /></div>
          <div><label htmlFor={`${id}-requests`} className="block text-gold text-sm mb-2">Preferred start time, occasion, and special requests</label><textarea id={`${id}-requests`} rows={4} maxLength={5000} value={form.requests} onChange={e => setForm({ ...form, requests: e.target.value })} className={inputClass} /></div>
          <p className="text-cream/60 text-sm">We will confirm the charter price, departure marina, captain and crew arrangements, and any applicable fuel, marina fees, taxes, and gratuity before you reserve.</p>
          {error && <p role="alert" className="text-red-400">{error}</p>}
          <button disabled={sending} className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl disabled:opacity-60">{sending ? "Sending…" : "Request a Charter Quote"}</button>
        </form>}
      </div>
    </section>
  </>;
}
