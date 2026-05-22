import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#0A0A0A",
          charcoal: "#1A1A1A",
          soft: "#2A2A2A",
          muted: "#3A3A3A",
        },
        gold: {
          DEFAULT: "#C9A765",
          warm: "#D4AF37",
          light: "#E8D5A3",
          dark: "#A08040",
          glow: "rgba(201,167,101,0.25)",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          muted: "#E8E0D0",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem,6vw,5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["clamp(2rem,4vw,3.5rem)", { lineHeight: "1.15" }],
        "headline": ["clamp(1.5rem,3vw,2.5rem)", { lineHeight: "1.2" }],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A765 0%, #D4AF37 50%, #C9A765 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        "hero-overlay": "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.95) 100%)",
        "card-glow": "radial-gradient(ellipse at top, rgba(201,167,101,0.15), transparent 70%)",
      },
      boxShadow: {
        gold: "0 0 30px rgba(201,167,101,0.3), 0 0 60px rgba(201,167,101,0.1)",
        "gold-sm": "0 0 15px rgba(201,167,101,0.2)",
        "glass": "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,167,101,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(201,167,101,0.5)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
