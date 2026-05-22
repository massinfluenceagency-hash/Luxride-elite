import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, including your name, email address, phone number, pickup and dropoff addresses, and payment information when you book our services or request a quote.",
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
    content: "We implement industry-standard security measures to protect your personal information. All payment transactions are processed through secure, encrypted channels. We retain your data only for as long as necessary to provide our services.",
  },
  {
    title: "Cookies",
    content: "We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You may disable cookies in your browser settings, though some features may not function properly.",
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at privacy@luxrideelite.com or call (305) 555-1234.",
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
