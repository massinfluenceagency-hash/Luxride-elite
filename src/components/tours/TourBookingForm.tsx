"use client";
import { submitRequest } from "@/lib/utils/submitRequest";
import { useState } from "react";
import { TOUR_PACKAGE_NOTICE } from "@/lib/data/tours";
import { Tour } from "@/types/tour";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function TourBookingForm({ tour, locale: _locale }: { tour: Tour; locale: string }) {
  const [persons, setPersons] = useState(Math.max(2, tour.minPersons));
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const total = tour.packagePrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true); setError("");
    try {
      await submitRequest({ type: "tour", tourId: tour.id, persons, date, name, email });
      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to send your request. Please try again or call us.");
    } finally { setSending(false); }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
          <span className="text-green-400 text-2xl">✓</span>
        </div>
        <h4 className="text-white font-bold text-lg mb-2">Booking Request Sent!</h4>
        <p className="text-cream/50 text-sm">Your {tour.title} request has been sent. Our team will contact you to confirm availability and pricing.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="field-1" className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">Date</label>
        <input id="field-1"
          type="date"
          min={new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" })}
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none text-sm"
        />
      </div>
      <div>
        <label htmlFor="field-2" className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">
          Persons ({tour.minPersons}–{tour.maxPersons})
        </label>
        <input id="field-2"
          type="number"
          min={tour.minPersons}
          max={tour.maxPersons}
          required
          value={persons}
          onChange={(e) => setPersons(Number(e.target.value))}
          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none text-sm"
        />
      </div>
      <div>
        <label htmlFor="field-3" className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">Full Name</label>
        <input id="field-3"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none text-sm"
        />
      </div>
      <div>
        <label htmlFor="field-4" className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">Email</label>
        <input id="field-4"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none text-sm"
        />
      </div>
      <p className="text-cream/70 text-sm leading-relaxed">{TOUR_PACKAGE_NOTICE}</p>
      <div className="py-3 border-t border-white/10">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-cream/50">{tour.duration} vehicle package · {persons} persons</span>
          <span className="text-white font-bold">{formatCurrency(total)}</span>
        </div>
      </div>
      {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl hover:shadow-gold transition-all duration-300"
      >
        {sending ? "Sending..." : `Request Vehicle Package — ${formatCurrency(total)}`}
      </button>
    </form>
  );
}
