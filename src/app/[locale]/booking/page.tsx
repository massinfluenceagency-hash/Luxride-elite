"use client";
import { submitRequest } from "@/lib/utils/submitRequest";
import { takeBookingDraft } from "@/lib/utils/bookingDraft";
import { isFutureMiamiPickup, miamiDateTime } from "@/lib/utils/miamiTime";
import { useEffect, useState } from "react";
import { use } from "react";
import { CheckCircle, Car, MapPin, User, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { chauffeurVehicles as vehicles } from "@/lib/data/fleet";

const STEPS = [
  { label: "Service", Icon: Car },
  { label: "Location & Time", Icon: MapPin },
  { label: "Contact Info", Icon: User },
  { label: "Requests", Icon: MessageSquare },
  { label: "Confirm", Icon: CheckCircle },
];

export default function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    vehicleId: "escalade-suv",
    serviceType: "transfer",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    requests: "",
    durationHours: "3",
    passengerCount: "2",
  });

  useEffect(() => {
    const draft = takeBookingDraft();
    if (draft) setForm(previous => ({ ...previous, ...draft, durationHours: String(draft.durationHours), passengerCount: String(draft.passengerCount) }));
  }, []);

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));
  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);

  const nextStep = () => {
    setError("");
    if (step === 0 && form.serviceType === "hourly" && Number(form.durationHours) < 3) { setError("Hourly chauffeur service has a three-hour minimum."); return; }
    if (step === 0 && (!Number.isInteger(Number(form.passengerCount)) || Number(form.passengerCount) < 1 || Number(form.passengerCount) > (selectedVehicle?.passengers ?? 0) || Number(form.durationHours) < 1 || Number(form.durationHours) > 24)) {
      setError("Please select 1–24 hours and a passenger count within the vehicle capacity."); return;
    }
    if (step === 1 && (!form.pickup.trim() || !form.dropoff.trim() || !form.date || !form.time)) {
      setError("Please enter pickup, dropoff, date, and time."); return;
    }
    if (step === 1 && !isFutureMiamiPickup(form.date, form.time)) {
      setError("Please choose a future pickup date and time in Miami."); return;
    }
    if (step === 2 && (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.phone.trim())) {
      setError("Please enter your name, a valid email address, and phone number."); return;
    }
    setStep(s => s + 1);
  };
  const handleConfirm = async () => {
    if (sending) return;
    setError(""); setSending(true);
    try {
      await submitRequest({ type: "booking", ...form, durationHours: Number(form.durationHours), passengerCount: Number(form.passengerCount) });
      setConfirmed(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to send your request. Please try again or call us.");
    } finally { setSending(false); }
  };

  const inputClass = "w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none";
  const labelClass = "block text-gold text-xs font-semibold mb-2 tracking-wide";

  if (confirmed) {
    return (
      <>
        <Navbar locale={locale} />
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center px-4 max-w-lg">
            <div className="w-24 h-24 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} className="text-gold" />
            </div>
            <h2 className="font-display font-black text-4xl text-white mb-4">Booking Request Sent!</h2>
            <p className="text-cream/60 text-lg mb-2">Thank you, {form.name}.</p>
            <p className="text-cream/50 mb-8">Your request has been sent. Our team will contact you at {form.email} to confirm availability, pricing, and reservation details.</p>
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-cream/40">Vehicle:</span><span className="text-white">{selectedVehicle?.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-cream/40">Pickup:</span><span className="text-white">{form.pickup || "TBD"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-cream/40">Date:</span><span className="text-white">{form.date} {form.time}</span></div>
            </div>
          </div>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        <div className="py-12 border-b border-gold/20">
          <div className="container-luxe">
            <SectionHeading as="h1" label="Black SUV & Chauffeur Service" title="Request Your Chauffeur Ride" subtitle="Choose a Suburban or Escalade with a professional driver. Send your route and schedule; our team will confirm availability and final pricing." />
          </div>
        </div>

        <section className="section-padding">
          <div className="container-luxe max-w-3xl">
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-12 overflow-x-auto pb-2">
              {STEPS.map(({ label, Icon }, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      i < step ? "bg-gold border-gold" : i === step ? "border-gold bg-gold/20" : "border-white/20 bg-transparent"
                    }`}>
                      {i < step ? <CheckCircle size={16} className="text-black" /> : <Icon size={16} className={i === step ? "text-gold" : "text-cream/30"} />}
                    </div>
                    <span className={`text-xs mt-1.5 font-medium ${i === step ? "text-gold" : i < step ? "text-cream/60" : "text-cream/20"}`}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`h-px w-8 sm:w-16 mx-2 flex-shrink-0 ${i < step ? "bg-gold" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>

            <GlassCard className="p-5 sm:p-8">
              {step === 0 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Select Your Service</h3>
                  <div>
                    <label htmlFor="field-1" className={labelClass}>Vehicle</label>
                    <select id="field-1" value={form.vehicleId} onChange={(e) => { update("vehicleId", e.target.value); const capacity = vehicles.find(v => v.id === e.target.value)?.passengers ?? 1; update("passengerCount", String(Math.min(Number(form.passengerCount), capacity))); }} className={inputClass}>
                      {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name} — ${v.hourlyRate}/hr</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="field-2" className={labelClass}>Service Type</label>
                    <select id="field-2" value={form.serviceType} onChange={(e) => update("serviceType", e.target.value)} className={inputClass}>
                      <option value="transfer">Point-to-Point Transfer</option>
                      <option value="hourly">Hourly Charter</option>
                      <option value="airport">Airport Transfer</option>
                      <option value="event">Special Event</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label htmlFor="booking-hours" className={labelClass}>Service hours</label><input id="booking-hours" type="number" min={form.serviceType === "hourly" ? 3 : 1} max="24" value={form.durationHours} onChange={e => update("durationHours", e.target.value)} className={inputClass} /></div>
                    <div><label htmlFor="booking-passengers" className={labelClass}>Passengers (up to {selectedVehicle?.passengers})</label><input id="booking-passengers" type="number" min="1" max={selectedVehicle?.passengers} value={form.passengerCount} onChange={e => update("passengerCount", e.target.value)} className={inputClass} /></div>
                  </div>
                  <p className="text-cream/70 text-sm">For a transfer, enter your estimated service time; our team will confirm the schedule. For sightseeing time packages, <a href={`/${locale}/tours`} className="text-gold underline">view our packages</a>.</p>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Pickup & Schedule</h3>
                  <div>
                    <label htmlFor="field-3" className={labelClass}>Pickup Address</label>
                    <input id="field-3" value={form.pickup} onChange={(e) => update("pickup", e.target.value)} className={inputClass} placeholder="e.g. Miami International Airport" />
                  </div>
                  <div>
                    <label htmlFor="field-4" className={labelClass}>Dropoff Address</label>
                    <input id="field-4" value={form.dropoff} onChange={(e) => update("dropoff", e.target.value)} className={inputClass} placeholder="e.g. 1 Hotel South Beach" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="field-5" className={labelClass}>Date</label>
                      <input id="field-5" type="date" min={miamiDateTime().slice(0, 10)} value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="field-6" className={labelClass}>Time (Miami / Eastern)</label>
                      <input id="field-6" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Your Contact Information</h3>
                  <div>
                    <label htmlFor="field-7" className={labelClass}>Full Name</label>
                    <input id="field-7" required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="field-8" className={labelClass}>Email Address</label>
                    <input id="field-8" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="field-9" className={labelClass}>Phone Number</label>
                    <input id="field-9" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="(305) 000-0000" />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Special Requests</h3>
                  <textarea
                    aria-label="Special requests"
                    rows={6}
                    value={form.requests}
                    onChange={(e) => update("requests", e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Any special accommodations, decorations, routes, dietary requirements, or anything else we should know..."
                  />
                  <p className="text-cream/30 text-sm">Tell us about luggage, flight details, child seats, or accessibility needs. Our team will confirm what is available.</p>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Review Your Request</h3>
                  <div className="space-y-3">
                    {[
                      ["Vehicle", selectedVehicle?.name ?? ""],
                      ["Service", form.serviceType],
                      ["Service hours", form.durationHours],
                      ["Passengers", form.passengerCount],
                      ["Pickup", form.pickup || "TBD"],
                      ["Dropoff", form.dropoff || "TBD"],
                      ["Date & Time", `${form.date} ${form.time} (Miami time)`],
                      ["Name", form.name],
                      ["Email", form.email],
                      ["Phone", form.phone],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                        <span className="text-cream/40">{k}</span>
                        <span className="text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                  {form.requests && (
                    <div className="bg-white/5 rounded-xl p-4 text-sm text-cream/60">
                      <div className="text-gold text-xs font-semibold mb-2">Special Requests:</div>
                      {form.requests}
                    </div>
                  )}
                </div>
              )}

              {error && <p role="alert" className="text-red-400 text-sm mt-6">{error}</p>}
              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                {step > 0 && (
                  <button disabled={sending} onClick={() => { setError(""); setStep(s => s - 1); }} className="border border-white/20 text-cream px-6 py-3 rounded-xl hover:border-gold hover:text-gold transition-all">
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button onClick={nextStep} className="flex-1 bg-gold-gradient text-black font-bold py-3 rounded-xl hover:shadow-gold transition-all duration-300">
                    Next Step
                  </button>
                ) : (
                  <button disabled={sending} onClick={handleConfirm} className="flex-1 bg-gold-gradient text-black font-bold py-3 rounded-xl hover:shadow-gold transition-all duration-300">
                    {sending ? "Sending..." : "Send Booking Request"}
                  </button>
                )}
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
