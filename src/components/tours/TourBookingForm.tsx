"use client";
import { useState } from "react";
import { Tour } from "@/types/tour";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function TourBookingForm({ tour, locale: _locale }: { tour: Tour; locale: string }) {
  const [persons, setPersons] = useState(2);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const total = persons * tour.pricePerPerson;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
          <span className="text-green-400 text-2xl">✓</span>
        </div>
        <h4 className="text-white font-bold text-lg mb-2">Booking Request Sent!</h4>
        <p className="text-cream/50 text-sm">We&apos;ll confirm your {tour.title} booking within 30 minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none text-sm"
        />
      </div>
      <div>
        <label className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">
          Persons ({tour.minPersons}–{tour.maxPersons})
        </label>
        <input
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
        <label className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none text-sm"
        />
      </div>
      <div>
        <label className="block text-gold text-xs font-semibold mb-1.5 tracking-wide">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none text-sm"
        />
      </div>
      <div className="py-3 border-t border-white/10">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-cream/50">{formatCurrency(tour.pricePerPerson)} × {persons} persons</span>
          <span className="text-white font-bold">{formatCurrency(total)}</span>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl hover:shadow-gold transition-all duration-300"
      >
        Book This Tour — {formatCurrency(total)}
      </button>
    </form>
  );
}
