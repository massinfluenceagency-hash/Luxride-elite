"use client";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Clock, Users, Car, Plane } from "lucide-react";
import { chauffeurVehicles as vehicles } from "@/lib/data/fleet";
import { calculateQuote } from "@/lib/utils/quoteCalculator";
import { QuoteResult, ServiceType } from "@/types/quote";
import QuoteResultCard from "./QuoteResult";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveBookingDraft } from "@/lib/utils/bookingDraft";
import { isFutureMiamiPickup, miamiDateTime } from "@/lib/utils/miamiTime";
import GlassCard from "@/components/ui/GlassCard";

export default function QuoteGenerator({ locale, initialVehicleId = "escalade-suv" }: { locale: string; initialVehicleId?: string }) {
  const id = useId();
  const router = useRouter();
  const t = useTranslations("quote");
  const [serviceType, setServiceType] = useState<ServiceType>("transfer");
  const [vehicleId, setVehicleId] = useState(initialVehicleId);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(3);
  const [passengers, setPassengers] = useState(2);
  const [isAirport, setIsAirport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState("");
  const [matchedRoute, setMatchedRoute] = useState<{ origin: string; destination: string } | null>(null);

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      setError("Please enter both pickup and dropoff addresses.");
      return;
    }
    if (date && !isFutureMiamiPickup(date.slice(0, 10), date.slice(11, 16))) { setError("Please select a future pickup time in Miami."); return; }
    setError("");
    setLoading(true);
    try {
      setResult(null);
      setMatchedRoute(null);
      const res = await fetch("/api/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to calculate the route. Please try again.");
      const miles = data.distanceMiles;
      if (!Number.isFinite(miles) || miles < 0) throw new Error("Unable to calculate the route. Please contact us for a quote.");

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
      setMatchedRoute({ origin: data.resolvedOrigin, destination: data.resolvedDestination });
      setResult(quoteResult);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to calculate your quote. Please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  const SERVICE_TYPES: { value: ServiceType; label: string }[] = [
    { value: "transfer", label: t("services.transfer") },
    { value: "hourly", label: t("services.hourly") },
    { value: "airport", label: t("services.airport") },
    { value: "event", label: t("services.event") },
  ];

  const continueBooking = () => {
    saveBookingDraft({ vehicleId, serviceType: serviceType === "tour" ? "hourly" : serviceType, pickup: origin, dropoff: destination, date: date.slice(0, 10), time: date.slice(11, 16), durationHours: hours, passengerCount: passengers });
    router.push(`/${locale}/booking`);
  };

  return (
    <div className="w-full">
      <GlassCard className="p-5 sm:p-8">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Service type */}
          <div>
            <label className="block text-gold text-sm font-semibold mb-3 tracking-wide">{t("service_type")}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {SERVICE_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  aria-pressed={serviceType === value}
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
            <label htmlFor={`${id}-vehicle`} className="block text-gold text-sm font-semibold mb-2 tracking-wide">
              <Car size={14} className="inline mr-1.5" />{t("vehicle")}
            </label>
            <select id={`${id}-vehicle`}
              value={vehicleId}
              onChange={(e) => { setVehicleId(e.target.value); const vehicle = vehicles.find(v => v.id === e.target.value); if (vehicle) setPassengers(p => Math.min(p, vehicle.passengers)); }}
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
              <label htmlFor={`${id}-pickup`} className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <MapPin size={14} className="inline mr-1.5" />{t("pickup")}
              </label>
              <input id={`${id}-pickup`}
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Miami International Airport"
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor={`${id}-dropoff`} className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <MapPin size={14} className="inline mr-1.5" />{t("dropoff")}
              </label>
              <input id={`${id}-dropoff`}
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
              <label htmlFor={`${id}-date`} className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <Clock size={14} className="inline mr-1.5" />{t("date")}
              </label>
              <input id={`${id}-date`}
                type="datetime-local"
                min={miamiDateTime()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor={`${id}-hours`} className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <Clock size={14} className="inline mr-1.5" />{t("hours")}
              </label>
              <input id={`${id}-hours`}
                type="number"
                min={1}
                max={24}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor={`${id}-passengers`} className="block text-gold text-sm font-semibold mb-2 tracking-wide">
                <Users size={14} className="inline mr-1.5" />{t("passengers")}
              </label>
              <input id={`${id}-passengers`}
                type="number"
                min={1}
                max={selectedVehicle?.passengers ?? 20}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
              />
            </div>
          </div>

          <p className="text-cream/70 text-xs">All pickup times are Miami / Eastern time. Prices are estimates; availability and final details are confirmed by our team.</p>
          <Link href={`/${locale}/tours`} className="inline-block text-gold underline text-sm">Looking for a half-day or full-day sightseeing package?</Link>
          {/* Airport toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={isAirport}
              aria-label="Airport transfer fee"
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

          {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl hover:shadow-gold hover:scale-[1.01] transition-all duration-300 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? t("calculating") : t("calculate")}
          </button>
        </form>
        <div className="mt-5 pt-5 border-t border-white/10 text-center">
          <p className="text-cream/70 text-sm mb-3">Prefer a personal quote, or having trouble calculating your route?</p>
          <button type="button" onClick={continueBooking} className="text-gold underline font-semibold py-2">Send my trip details to the team</button>
          <p className="text-cream/70 text-sm mt-2">Or call <a href="tel:+18002404727" className="text-gold underline">1 (800) 240-4727</a></p>
        </div>
      </GlassCard>

      {result && (
        <div className="mt-8">
          {matchedRoute && <div className="mb-4 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm text-cream/80"><p className="font-semibold text-gold mb-2">Check the matched route</p><p>Pickup: {matchedRoute.origin}</p><p className="mt-1">Dropoff: {matchedRoute.destination}</p><p className="mt-3">If these locations differ from your plans, correct the addresses before requesting your ride.</p></div>}
          <QuoteResultCard key={result.quoteId} result={result} locale={locale} onBook={continueBooking} />
        </div>
      )}
    </div>
  );
}
