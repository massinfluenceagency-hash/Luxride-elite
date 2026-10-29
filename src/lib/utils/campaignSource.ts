const KEY = "luxride-campaign";
const fields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export function captureCampaign(): Record<string, string> {
  try {
    const query = new URLSearchParams(window.location.search);
    const current = Object.fromEntries(fields.flatMap(key => {
      const value = query.get(key)?.trim().slice(0, 120);
      return value ? [[key, value]] : [];
    }));
    if (current.utm_source || current.utm_campaign) sessionStorage.setItem(KEY, JSON.stringify(current));
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch { return {}; }
}
