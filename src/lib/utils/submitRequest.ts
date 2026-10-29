import { captureCampaign } from "./campaignSource";

export async function submitRequest(payload: Record<string, unknown>) {
  const response = await fetch("/api/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, campaign: captureCampaign() }),
  });
  const data = await response.json();
  if (!response.ok || data.success !== true) {
    throw new Error(data.error || "Your request could not be sent. Please try again or call us.");
  }
  try {
    const target = window as Window & { dataLayer?: Record<string, unknown>[] };
    target.dataLayer = target.dataLayer || [];
    target.dataLayer.push({ event: "generate_lead", lead_type: payload.type });
  } catch { /* Measurement must never block a successful request. */ }
}
