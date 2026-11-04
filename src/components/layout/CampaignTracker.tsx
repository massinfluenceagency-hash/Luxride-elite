"use client";
import { useEffect, useState } from "react";
import { CONSENT_KEY, measureEvent, setAnalyticsConsent } from "@/lib/utils/analytics";
import { usePathname } from "next/navigation";
import { captureCampaign } from "@/lib/utils/campaignSource";
export default function CampaignTracker() {
  const pathname = usePathname();
  const [showConsent, setShowConsent] = useState(false);
  useEffect(() => { try { setShowConsent(localStorage.getItem(CONSENT_KEY) === null); } catch { /* Remain opted out. */ } }, []);
  useEffect(() => { captureCampaign(); measureEvent("page_view"); }, [pathname]);
  function chooseConsent(accepted: boolean) {
    setAnalyticsConsent(accepted);
    setShowConsent(false);
    if (accepted) measureEvent("page_view");
  }
  useEffect(() => {
    const recordCall = (event: MouseEvent) => {
      const link=event.target instanceof Element ? event.target.closest('a[href^="tel:"]') : null;
      if (!link) return;
      measureEvent("phone_link_click");
      const target=window as Window & {dataLayer?: Record<string, unknown>[]};
      target.dataLayer=target.dataLayer||[];
      target.dataLayer.push({event:"phone_link_click",...captureCampaign()});
    };
    document.addEventListener("click",recordCall);
    return () => document.removeEventListener("click",recordCall);
  }, []);
  return <>
    <div className="bg-black px-4 py-2 text-center"><button className="text-cream/70 text-xs underline py-2" onClick={() => setShowConsent(true)}>Analytics preferences</button></div>
    {showConsent && <aside aria-label="Analytics preferences" className="fixed top-24 inset-x-3 sm:left-auto sm:right-5 sm:w-96 z-50 bg-black border border-gold/50 rounded-xl p-5 shadow-xl text-cream">
      <h2 className="font-semibold text-gold">Help us improve your experience</h2>
      <p className="text-sm mt-2">Allow Google Analytics cookies to measure site visits and booking inquiries? Your choice won’t affect booking. We don’t send your contact or trip details to Google.</p>
      <div className="flex gap-3 mt-4"><button className="border border-gold/50 rounded-lg px-4 py-2" onClick={() => chooseConsent(false)}>No thanks</button><button className="bg-gold text-black rounded-lg px-4 py-2" onClick={() => chooseConsent(true)}>Allow analytics</button></div>
    </aside>}
  </>;
}
