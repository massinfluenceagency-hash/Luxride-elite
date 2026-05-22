import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";

const SECTIONS = [
  {
    title: "Reservation and Booking",
    content: "All reservations require a valid credit card for authorization. Bookings are confirmed only upon receipt of a confirmation email from LuxRide Elite. We reserve the right to refuse service at our discretion.",
  },
  {
    title: "Cancellation Policy",
    content: "Cancellations made 24 hours or more prior to the scheduled pickup time receive a full refund. Cancellations within 24 hours are subject to a 50% fee. No-shows are charged the full reservation amount.",
  },
  {
    title: "Passenger Conduct",
    content: "Passengers are responsible for any damage caused to our vehicles during their reservation. Smoking, illegal substances, and disruptive behavior are strictly prohibited. LuxRide Elite reserves the right to terminate service and charge the full fare if these policies are violated.",
  },
  {
    title: "Wait Time",
    content: "For airport pickups, we provide a 45-minute complimentary wait time after the scheduled arrival. For all other pickups, we provide 15 minutes. Additional wait time is billed at the applicable hourly rate in 15-minute increments.",
  },
  {
    title: "Liability",
    content: "LuxRide Elite is not liable for delays caused by traffic, weather, mechanical issues, or other circumstances beyond our control. We are not responsible for items left in our vehicles, though we will make every effort to locate and return lost items.",
  },
  {
    title: "Rate Changes",
    content: "Rates are subject to change without notice. The rate confirmed at time of booking will be honored. Gratuity is not included unless specifically noted and is at the passenger's discretion.",
  },
  {
    title: "Governing Law",
    content: "These terms shall be governed by and construed in accordance with the laws of the State of Florida. Any disputes arising from these terms shall be resolved in Miami-Dade County courts.",
  },
];

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen pt-24">
        <div className="py-16 border-b border-gold/20">
          <div className="container-luxe">
            <SectionHeading
              label="Legal"
              title="Terms of Service"
              subtitle="Last updated: January 1, 2025"
            />
          </div>
        </div>

        <section className="section-padding">
          <div className="container-luxe max-w-3xl">
            <div className="space-y-10">
              {SECTIONS.map(({ title, content }) => (
                <div key={title}>
                  <h2 className="font-display font-bold text-xl text-gold mb-4">{title}</h2>
                  <p className="text-cream/60 leading-relaxed">{content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
