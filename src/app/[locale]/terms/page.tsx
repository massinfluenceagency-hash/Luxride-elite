import { CHAUFFEUR_DEPOSIT_NOTICE, CHAUFFEUR_CANCELLATION_NOTICE, RENTAL_DEPOSIT_NOTICE, TRANSFER_PRICE_NOTICE } from "@/lib/data/bookingPolicies";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";

const SECTIONS = [
  { title: "Requests and Reservations", content: "Website forms submit inquiries only and do not take payment or secure a reservation. Our team confirms availability, final pricing, payment arrangements, and reservation details directly with you." },
  { title: "Chauffeur Booking Deposit", content: CHAUFFEUR_DEPOSIT_NOTICE },
  { title: "Chauffeur Cancellation Policy", content: CHAUFFEUR_CANCELLATION_NOTICE },
  { title: "Pickup and Drop-off Prices", content: TRANSFER_PRICE_NOTICE },
  { title: "Car Rental Security Deposits", content: RENTAL_DEPOSIT_NOTICE },
  { title: "Car Rental and Yacht Agreements", content: "The chauffeur cancellation policy above applies to chauffeur bookings only. Rental and yacht cancellation, payment, and security terms are provided with the specific agreement before payment. Yacht inquiries are requests for a quote: four-hour charters with up to 13 guests. Departure marina, crew, fuel, fees, taxes, and gratuity require confirmation." },
  { title: "First-Time Offers", content: "First-time chauffeur rates are $50/hour for a Suburban and $75/hour for an Escalade, with a three-hour minimum for this offer only. Regular hourly service and transfers do not have that promotional minimum. The first car rental offer discounts the vehicle rental base by 25%; it does not reduce the security deposit or other charges. Eligibility, availability, and final charges require confirmation before reservation." },
  { title: "Wait Time and Additional Charges", content: "Share flight details, stops, luggage, and any special requirements when requesting service. Our team will confirm wait-time allowances, any additional charges, and the final itinerary before you reserve." },
  { title: "Tour Packages", content: "Tour packages cover the vehicle and chauffeur time. Half-day packages are 3–4 hours and full-day packages are 6–8 hours. Activities, admission, food, drinks, equipment, and other third-party services are arranged and paid for separately." },
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
              subtitle="Last updated: November 3, 2026"
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
