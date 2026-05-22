"use client";
import { useState } from "react";
import { use } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setSending(false);
  };

  const CONTACT_INFO = [
    { Icon: Phone, label: "Call Us", value: "(305) 555-1234", sub: "Available 24/7" },
    { Icon: Mail, label: "Email Us", value: "info@luxrideelite.com", sub: "Reply within 1 hour" },
    { Icon: MapPin, label: "Location", value: "Miami Beach, FL 33139", sub: "Serving all South Florida" },
    { Icon: Clock, label: "Hours", value: "24 Hours / 7 Days", sub: "Never closed" },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        <div className="py-16 border-b border-gold/20">
          <div className="container-luxe">
            <SectionHeading
              label="Get in Touch"
              title="Contact LuxRide Elite"
              subtitle="We're here around the clock for all your luxury transportation needs. Reach out and we'll respond within minutes."
            />
          </div>
        </div>

        <section className="section-padding">
          <div className="container-luxe">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact info */}
              <div className="lg:col-span-2 space-y-4">
                {CONTACT_INFO.map(({ Icon, label, value, sub }) => (
                  <GlassCard key={label} className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-0.5">{label}</div>
                      <div className="text-white font-semibold text-sm">{value}</div>
                      <div className="text-cream/40 text-xs">{sub}</div>
                    </div>
                  </GlassCard>
                ))}

                {/* Map embed */}
                <div className="rounded-2xl overflow-hidden border border-gold/20 h-48 bg-black-charcoal">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57434.02!2d-80.1917!3d25.7617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                <GlassCard className="p-8">
                  {sent ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} className="text-green-400" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-white mb-3">Message Sent!</h3>
                      <p className="text-cream/50">We&apos;ll get back to you within 1 hour. For urgent requests, call us directly at (305) 555-1234.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-display font-bold text-2xl text-white mb-6">Send Us a Message</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-gold text-xs font-semibold mb-2 tracking-wide">Full Name</label>
                          <input
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-gold text-xs font-semibold mb-2 tracking-wide">Phone</label>
                          <input
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                            placeholder="(305) 000-0000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gold text-xs font-semibold mb-2 tracking-wide">Email Address</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-gold text-xs font-semibold mb-2 tracking-wide">Message</label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-black-soft border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none resize-none"
                          placeholder="Tell us about your transportation needs..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl hover:shadow-gold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {sending ? (
                          <><span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" /> Sending...</>
                        ) : (
                          <><Send size={16} /> Send Message</>
                        )}
                      </button>
                    </form>
                  )}
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
