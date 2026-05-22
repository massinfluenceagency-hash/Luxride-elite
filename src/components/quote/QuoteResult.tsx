"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Download, Mail, CheckCircle, Car, MapPin, Clock, Users } from "lucide-react";
import { QuoteResult } from "@/types/quote";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

export default function QuoteResultCard({ result, locale }: { result: QuoteResult; locale: string }) {
  const t = useTranslations("quote");
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [sending, setSending] = useState(false);

  const handleEmail = async () => {
    if (!email) return;
    setSending(true);
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, quote: result }),
      });
      setEmailSent(true);
      setShowEmailForm(false);
    } catch {
      // silent fail — user can retry
    } finally {
      setSending(false);
    }
  };

  const handlePDF = async () => {
    const { generateQuotePDF } = await import("@/lib/utils/pdfGenerator");
    generateQuotePDF(result);
  };

  return (
    <GlassCard glow className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div>
          <h3 className="font-display font-bold text-2xl text-white mb-1">{t("your_quote")}</h3>
          <p className="text-cream/40 text-sm">
            {t("quote_id")}: <span className="text-gold font-mono">{result.quoteId}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-gold font-display font-black text-4xl">{formatCurrency(result.total)}</div>
          <div className="text-cream/40 text-xs mt-1">
            {t("valid_until")}: {result.validUntil.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Trip info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { Icon: Car, label: "Vehicle", value: result.vehicleName },
          { Icon: MapPin, label: t("distance"), value: `${result.distanceMiles.toFixed(1)} mi` },
          { Icon: Clock, label: "Duration", value: `${result.durationHours}h` },
          { Icon: Users, label: "Passengers", value: String(result.passengerCount) },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gold text-xs mb-1.5">
              <Icon size={13} />
              <span className="font-semibold uppercase tracking-wide">{label}</span>
            </div>
            <div className="text-white font-semibold text-sm">{value}</div>
          </div>
        ))}
      </div>

      {/* Breakdown */}
      <div className="space-y-3 mb-8">
        {result.breakdown.map((item) => (
          <div
            key={item.label}
            className={`flex justify-between items-center py-2 ${
              item.type === "total"
                ? "border-t border-gold/30 pt-4 mt-2"
                : item.type === "subtotal"
                ? "border-t border-white/10 pt-3"
                : ""
            }`}
          >
            <span
              className={`text-sm ${
                item.type === "total" ? "text-white font-bold text-base" : "text-cream/60"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`font-semibold ${
                item.type === "total" ? "text-gold font-bold text-xl" : "text-cream/80"
              }`}
            >
              {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${locale}/booking`}
          className="flex-1 bg-gold-gradient text-black font-bold py-3.5 rounded-xl text-center hover:shadow-gold transition-all duration-300"
        >
          {t("book_now")}
        </Link>
        <button
          onClick={handlePDF}
          className="flex items-center justify-center gap-2 border border-gold/50 text-cream px-6 py-3.5 rounded-xl hover:border-gold hover:bg-gold/10 transition-all duration-300 text-sm"
        >
          <Download size={16} className="text-gold" /> {t("download_pdf")}
        </button>
        <button
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="flex items-center justify-center gap-2 border border-gold/50 text-cream px-6 py-3.5 rounded-xl hover:border-gold hover:bg-gold/10 transition-all duration-300 text-sm"
        >
          <Mail size={16} className="text-gold" /> {t("email_quote")}
        </button>
      </div>

      {/* Email form */}
      {showEmailForm && !emailSent && (
        <div className="mt-4 flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("enter_email")}
            className="flex-1 bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
          />
          <button
            onClick={handleEmail}
            disabled={sending}
            className="bg-gold text-black font-semibold px-6 py-3 rounded-xl hover:shadow-gold transition-all disabled:opacity-60"
          >
            {sending ? "..." : t("send_quote")}
          </button>
        </div>
      )}
      {emailSent && (
        <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle size={16} /> {t("quote_sent")}
        </div>
      )}
    </GlassCard>
  );
}
