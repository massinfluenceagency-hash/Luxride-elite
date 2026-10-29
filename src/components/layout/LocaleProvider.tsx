"use client";
import { captureCampaign } from "@/lib/utils/campaignSource";
import { useEffect } from "react";

export function LocaleProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  useEffect(() => {
    captureCampaign();
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return <>{children}</>;
}
