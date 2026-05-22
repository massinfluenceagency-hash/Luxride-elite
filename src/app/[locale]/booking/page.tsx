"use client";
import { useState } from "react";
import { use } from "react";
import { CheckCircle, Car, MapPin, User, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { vehicles } from "@/lib/data/fleet";

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
  });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));
  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);

  const handleConfirm = () => setConfirmed(true);

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
            <h2 className="font-display font-black text-4xl text-white mb-4">Booking Confirmed!</h2>
            <p className="text-cream/60 text-lg mb-2">Thank you, {form.name}.</p>
            <p className="text-cream/50 mb-8">We&apos;ll contact you at {form.email} within 30 minutes to confirm all details of your LuxRide Elite reservation.</p>
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
            <SectionHeading label="Reservation" title="Reserve Your Vehicle" subtitle="Complete your booking in just a few steps" />
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

            <GlassCard className="p-8">
              {step === 0 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Select Your Service</h3>
                  <div>
                    <label className={labelClass}>Vehicle</label>
                    <select value={form.vehicleId} onChange={(e) => update("vehicleId", e.target.value)} className={inputClass}>
                      {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name} — ${v.hourlyRate}/hr</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Service Type</label>
                    <select value={form.serviceType} onChange={(e) => update("serviceType", e.target.value)} className={inputClass}>
                      <option value="transfer">Point-to-Point Transfer</option>
                      <option value="hourly">Hourly Charter</option>
                      <option value="airport">Airport Transfer</option>
                      <option value="event">Special Event</option>
                    </select>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Pickup & Schedule</h3>
                  <div>
                    <label className={labelClass}>Pickup Address</label>
                    <input value={form.pickup} onChange={(e) => update("pickup", e.target.value)} className={inputClass} placeholder="e.g. Miami International Airport" />
                  </div>
                  <div>
                    <label className={labelClass}>Dropoff Address</label>
                    <input value={form.dropoff} onChange={(e) => update("dropoff", e.target.value)} className={inputClass} placeholder="e.g. 1 Hotel South Beach" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Date</label>
                      <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Time</label>
                      <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Your Contact Information</h3>
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="(305) 000-0000" />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Special Requests</h3>
                  <textarea
                    rows={6}
                    value={form.requests}
                    onChange={(e) => update("requests", e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Any special accommodations, decorations, routes, dietary requirements, or anything else we should know..."
                  />
                  <p className="text-cream/30 text-sm">We accommodate virtually any request. No detail is too small.</p>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Confirm Your Booking</h3>
                  <div className="space-y-3">
                    {[
                      ["Vehicle", selectedVehicle?.name ?? ""],
                      ["Service", form.serviceType],
                      ["Pickup", form.pickup || "TBD"],
                      ["Dropoff", form.dropoff || "TBD"],
                      ["Date & Time", `${form.date} ${form.time}`],
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

              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)} className="border border-white/20 text-cream px-6 py-3 rounded-xl hover:border-gold hover:text-gold transition-all">
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button onClick={() => setStep(s => s + 1)} className="flex-1 bg-gold-gradient text-black font-bold py-3 rounded-xl hover:shadow-gold transition-all duration-300">
                    Next Step
                  </button>
                ) : (
                  <button onClick={handleConfirm} className="flex-1 bg-gold-gradient text-black font-bold py-3 rounded-xl hover:shadow-gold transition-all duration-300">
                    Confirm Booking
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
