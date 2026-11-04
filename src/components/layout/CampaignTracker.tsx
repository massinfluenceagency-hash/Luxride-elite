"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureCampaign } from "@/lib/utils/campaignSource";
export default function CampaignTracker() {
  const pathname = usePathname();
  useEffect(() => { captureCampaign(); }, [pathname]);
  useEffect(() => {
    const recordCall = (event: MouseEvent) => {
      const link=event.target instanceof Element ? event.target.closest('a[href^="tel:"]') : null;
      if (!link) return;
      const target=window as Window & {dataLayer?: Record<string, unknown>[]};
      target.dataLayer=target.dataLayer||[];
      target.dataLayer.push({event:"phone_link_click",...captureCampaign()});
    };
    document.addEventListener("click",recordCall);
    return () => document.removeEventListener("click",recordCall);
  }, []);
  return null;
}
