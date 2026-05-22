"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Clock, Users, Car, Plane } from "lucide-react";
import { vehicles } from "@/lib/data/fleet";
import { calculateQuote } from "@/lib/utils/quoteCalculator";
import { QuoteResult, ServiceType } from "@/types/quote";
import QuoteResultCard from "./QuoteResult";
import GlassCard from "@/components/ui/GlassCard";

export default function QuoteGenerator({ locale }: { locale: string }) {
  const t = useTranslations("quote");
  const [serviceType, setServiceType] = useState<ServiceType>("transfer");
  const [vehicleId, setVehicleId] = useState("escalade-suv");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(3);
  const [passengers, setPassengers] = useState(2);
  const [isAirport, setIsAirport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [distanceMiles, setDistanceMiles] = useState(15);
  const [error, setError] = useState("");

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      setError("Please enter both pickup and dropoff addresses.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Try Google Maps API; fall back to estimate if no key
      let miles = distanceMiles;
      try {
        const res = await fetch("/api/maps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin, destination }),
        });
        if (res.ok) {
          const data = await res.json();
          miles = data.distanceMiles ?? miles;
          setDistanceMiles(miles);
        }
      } catch {
        // fallback: estimate 15 miles
      }

      const quoteResult = calculateQuote(
        {
          serviceType,
          vehicleId,
          origin,
          destination,
          distanceMiles: miles,
          durationHours: hours,
          date: date ? new Date(date) : new Date(),
          passengerCount: passengers,
          isAirportTransfer: isAirport,
        },
        selectedVehicle?.name ?? vehicleId
      );
      setResult(quoteResult);
    } finally {
      setLoading(false);
    }
  };

  const SERVICE_TYPES: { value: ServiceType; label: string }[] = [
    { value: "transfer", label: t("services.transfer") },
    { value: "hourly", label: t("services.hourly") },
    { value: "airport", label: t("services.airport") },
    { value: "tour", label: t("services.tour") },
    { value: "event", label: t("services.event") },
  ];

  return (
    <div className="w-full">
      <GlassCard className="p-8">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Service type */}
          <div>
            <label className="block text-gold text-sm font-semibold mb-3 tracking-wide">{t("service_type")}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {SERVICE_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => { setServiceType(value); setIsAirport(value === "airport"); }}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    serviceType === value
                      ? "bg-gold text-black border-gold"
                      : "border-white/10 text-cream/60 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle */}
          <div>
            <label className="block text-gold text-sm font-semibold mb-2 tracking-wide">
              <Car size={14} className="inline mr-1.5" />{t("vehicle")}
            </label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — ${v.hourlyRate}/hr
                </option>
              ))}
            </select>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <MapPin size={14} className="inline mr-1.5" />{t("pickup")}
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Miami International Airport"
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <MapPin size={14} className="inline mr-1.5" />{t("dropoff")}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. 1 Hotel South Beach"
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
          </div>

          {/* Date, Hours, Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <Clock size={14} className="inline mr-1.5" />{t("date")}
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <Clock size={14} className="inline mr-1.5" />{t("hours")}
              </label>
              <input
                type="number"
                min={1}
                max={24}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <Users size={14} className="inline mr-1.5" />{t("passengers")}
              </label>
              <input
                type="number"
                min={1}
                max={selectedVehicle?.passengers ?? 20}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
          </div>

          {/* Airport toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAirport(!isAirport)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isAirport ? "bg-gold" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${isAirport ? "left-6" : "left-0.5"}`} />
            </button>
            <label className="text-cream/70 text-sm flex items-center gap-2">
              <Plane size={14} className="text-gold" />
              {t("airport_transfer")} (+$75)
            </label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl hover:shadow-gold hover:scale-[1.01] transition-all duration-300 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? t("calculating") : t("calculate")}
          </button>
        </form>
      </GlassCard>

      {result && (
        <div className="mt-8">
          <QuoteResultCard result={result} locale={locale} />
        </div>
      )}
    </div>
  );
}
