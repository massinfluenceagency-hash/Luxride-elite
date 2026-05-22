import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LuxRide Elite | Miami's Premier Luxury Transportation",
    template: "%s | LuxRide Elite",
  },
  description: "Miami's premier luxury transportation — limousines, black SUVs, exotic car rental, and exclusive guided tours. Available 24/7.",
  keywords: ["luxury limousine Miami", "exotic car rental Miami", "black car service", "chauffeur service Miami", "city tours Miami"],
  openGraph: {
    title: "LuxRide Elite | Where Luxury Meets the Road",
    description: "Miami's premier luxury transportation service — limousines, black SUVs, exotic cars & exclusive tours.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
