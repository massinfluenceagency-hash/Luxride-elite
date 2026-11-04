import { captureCampaign } from "./campaignSource";
const ID = "G-EEXC90XT2B";
export const CONSENT_KEY = "luxride-analytics-consent";
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; "ga-disable-G-EEXC90XT2B"?: boolean; };
export function setAnalyticsConsent(accepted: boolean) {
  try { localStorage.setItem(CONSENT_KEY, accepted ? "yes" : "no"); } catch { return; }
  (window as AnalyticsWindow)["ga-disable-G-EEXC90XT2B"] = !accepted;
}
export function hasAnalyticsConsent() {
  try { return localStorage.getItem(CONSENT_KEY) === "yes"; } catch { return false; }
}
export function startAnalytics() {
  if (!hasAnalyticsConsent()) return;
  const target = window as AnalyticsWindow;
  if (target.gtag) return;
  target.dataLayer = target.dataLayer || [];
  target.gtag = function () { target.dataLayer!.push(arguments); };
  target.gtag("js", new Date());
  target.gtag("config", ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: location.origin + location.pathname, page_referrer: "" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(script);
}
export function measureEvent(name: "page_view" | "phone_link_click" | "generate_lead") {
  try {
    if (!hasAnalyticsConsent()) return;
    startAnalytics();
    const source = captureCampaign().utm_source?.toLowerCase();
    const campaignSource = source && ["facebook", "instagram", "ig", "tiktok", "google"].includes(source) ? source : undefined;
    (window as AnalyticsWindow).gtag?.("event", name, { page_location: location.origin + location.pathname, page_referrer: "", ...(campaignSource ? { campaign_source: campaignSource } : {}) });
  } catch { /* Measurement must never interrupt booking. */ }
}
