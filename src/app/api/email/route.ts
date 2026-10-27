import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { escapeHtml, MailError, sendMail } from "@/lib/server/mail";

const schema = z.object({
  to: z.email().max(254),
  quote: z.object({
    quoteId: z.string().min(1).max(80), vehicleName: z.string().min(1).max(200),
    origin: z.string().min(1).max(500), destination: z.string().min(1).max(500),
    distanceMiles: z.number().nonnegative().max(100000), durationHours: z.number().positive().max(1000),
    validUntil: z.coerce.date(),
    breakdown: z.array(z.object({ label: z.string().max(300), amount: z.number().nonnegative(), type: z.enum(["base", "distance", "airport", "peak", "subtotal", "tax", "total"]) })).min(1).max(20),
  }),
});

type EmailQuote = z.infer<typeof schema>["quote"];

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please provide a valid email address and quote." }, { status: 400 });
  try {
    const { to, quote } = parsed.data;
    await sendMail(to, "Your LuxRide Elite Quote — " + quote.quoteId, buildEmailHtml(quote));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof MailError ? error.message : "Unable to send your quote. Please try again or call us." }, { status: error instanceof MailError ? error.status : 502 });
  }
}

function buildEmailHtml(quote: EmailQuote): string {
  const rows = quote.breakdown
    .map(
      (item) =>
        `<tr style="border-bottom:1px solid #2a2a2a">
          <td style="padding:10px 16px;color:${item.type === "total" ? "#C9A765" : "#ccc"};font-weight:${item.type === "total" ? "bold" : "normal"}">${escapeHtml(item.label)}</td>
          <td style="padding:10px 16px;text-align:right;color:${item.type === "total" ? "#C9A765" : "#ccc"};font-weight:${item.type === "total" ? "bold" : "normal"}">${formatCurrency(item.amount)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="background:#0a0a0a;margin:0;padding:0;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">
    <div style="background:linear-gradient(135deg,#C9A765,#D4AF37);padding:30px;border-radius:16px 16px 0 0;text-align:center">
      <h1 style="color:#000;font-size:28px;margin:0;font-family:Georgia,serif">LuxRide Elite</h1>
      <p style="color:#000;margin:4px 0 0;font-size:12px;letter-spacing:3px">WHERE LUXURY MEETS THE ROAD</p>
    </div>
    <div style="background:#1a1a1a;padding:32px;border-radius:0 0 16px 16px">
      <h2 style="color:#C9A765;font-size:20px;margin:0 0 8px">Your Quote is Ready</h2>
      <p style="color:#888;margin:0 0 24px;font-size:13px">Quote ID: <span style="color:#C9A765;font-family:monospace">${escapeHtml(quote.quoteId)}</span></p>
      <div style="background:#0a0a0a;border-radius:12px;padding:20px;margin-bottom:24px">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr><td style="padding:8px 0;color:#888">Vehicle</td><td style="padding:8px 0;color:#fff;text-align:right">${escapeHtml(quote.vehicleName)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">From</td><td style="padding:8px 0;color:#fff;text-align:right">${escapeHtml(quote.origin)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">To</td><td style="padding:8px 0;color:#fff;text-align:right">${escapeHtml(quote.destination)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Distance</td><td style="padding:8px 0;color:#fff;text-align:right">${quote.distanceMiles.toFixed(1)} miles</td></tr>
          <tr><td style="padding:8px 0;color:#888">Duration</td><td style="padding:8px 0;color:#fff;text-align:right">${quote.durationHours} hours</td></tr>
        </table>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px">${rows}</table>
      <div style="margin-top:32px;text-align:center">
        <a href="https://luxrideelite.com/en/booking" style="background:linear-gradient(135deg,#C9A765,#D4AF37);color:#000;font-weight:bold;padding:16px 40px;border-radius:50px;text-decoration:none;font-size:16px;display:inline-block">Book Now</a>
      </div>
      <p style="color:#555;font-size:11px;text-align:center;margin-top:24px">Quote valid until ${quote.validUntil.toLocaleDateString()} · (786) 948-2298</p>
    </div>
  </div>
</body>
</html>`;
}
