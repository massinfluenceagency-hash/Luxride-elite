"use client";

import { useEffect, useState } from "react";

export function PWARegister() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("SW registered:", reg.scope);
          })
          .catch((err) => {
            console.log("SW registration failed:", err);
          });
      });
    }

    // Capture the install prompt (Android Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      // Show banner after 10 seconds if user hasn't dismissed
      setTimeout(() => setShowBanner(true), 10000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (installPrompt as any).prompt();
    setShowBanner(false);
    setInstallPrompt(null);
  };

  if (!showBanner || !installPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[9999] md:left-auto md:right-6 md:w-80">
      <div className="bg-[#1A1A1A] border border-gold/30 rounded-2xl p-4 shadow-2xl shadow-black/60 flex items-center gap-4">
        {/* App icon */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/icon-96x96.png"
          alt="LuxRide Elite"
          className="w-14 h-14 rounded-xl flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm leading-tight">Add LuxRide Elite</p>
          <p className="text-cream/50 text-xs mt-0.5">Install the app for the best experience</p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="bg-gold-gradient text-black text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            Install
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="text-cream/40 text-xs text-center hover:text-cream/60 transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
