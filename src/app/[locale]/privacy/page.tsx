import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, including your name, email address, phone number, pickup and dropoff addresses, travel details, and information you enter in booking, rental, yacht, or contact requests. Website request forms do not collect card details or take payment.",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to provide, maintain, and improve our transportation services, process transactions, send booking confirmations and receipts, and communicate with you about our services.",
  },
  {
    title: "Information Sharing",
    content: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share your information with trusted third parties who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.",
  },
  {
    title: "Data Security",
    content: "We implement industry-standard security measures to protect your personal information. Do not include card numbers or other sensitive payment details in website request forms. We retain your data only for as long as necessary to provide our services.",
  },
  {
    title: "Cookies",
    content: "With your permission, we use Google Analytics cookies to measure website visits, call-button clicks, and successful inquiry submissions. Analytics remains off until you select Allow analytics. We do not send your name, email, phone number, pickup or destination addresses, or request message to Google Analytics. You can decline or change your choice using Analytics preferences on the website; booking remains available either way. We also retain campaign labels during your browser session so our team can identify the source of an inquiry.",
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at info@luxrideelite.com or call 1 (800) 240-4727.",
  },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
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
              title="Privacy Policy"
              subtitle="Last updated: November 4, 2026"
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
