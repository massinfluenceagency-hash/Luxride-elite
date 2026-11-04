const PIXEL_ID = "1314334424119536";
export const MARKETING_CONSENT_KEY = "luxride-marketing-consent";
type Pixel = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push?: Pixel; loaded: boolean; version: string };
type PixelWindow = Window & { fbq?: Pixel; _fbq?: Pixel };
export function hasMarketingConsent() {
  try { return localStorage.getItem(MARKETING_CONSENT_KEY) === "yes"; } catch { return false; }
}
export function setMarketingConsent(accepted: boolean) {
  try { localStorage.setItem(MARKETING_CONSENT_KEY, accepted ? "yes" : "no"); } catch { return; }
  (window as PixelWindow).fbq?.("consent", accepted ? "grant" : "revoke");
}
export function measureMetaEvent(name: "PageView" | "Lead") {
  try {
    // Do not load the vendor on URLs that could contain submitted details.
    if (!hasMarketingConsent() || location.search || location.hash) return;
    const target = window as PixelWindow;
    if (!target.fbq) {
      const pixel = function (...args: unknown[]) {
        if (pixel.callMethod) pixel.callMethod(...args); else pixel.queue.push(args);
      } as Pixel;
      pixel.queue = []; pixel.loaded = true; pixel.version = "2.0"; pixel.push = pixel;
      target.fbq = pixel; target._fbq = pixel;
      pixel("consent", "grant");
      pixel("set", "autoConfig", false, PIXEL_ID);
      pixel("init", PIXEL_ID);
      const script = document.createElement("script");
      script.async = true; script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }
    target.fbq("track", name);
  } catch { /* Tracking must never interrupt a customer request. */ }
}
