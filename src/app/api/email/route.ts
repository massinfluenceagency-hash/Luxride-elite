import { NextRequest, NextResponse } from "next/server";
import { QuoteResult } from "@/types/quote";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export async function POST(req: NextRequest) {
  try {
    const { to, quote }: { to: string; quote: QuoteResult } = await req.json();
    if (!to || !quote) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sgKey = process.env.SENDGRID_API_KEY;
    if (!sgKey) {
      // Log for development — no email sent without key
      console.log(`[DEV] Would send quote ${quote.quoteId} to ${to}`);
      return NextResponse.json({ success: true, dev: true });
    }

    const html = buildEmailHtml(quote);
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sgKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: "quotes@luxrideelite.com", name: "LuxRide Elite" },
        subject: `Your LuxRide Elite Quote — ${quote.quoteId}`,
        content: [{ type: "text/html", value: html }],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function buildEmailHtml(quote: QuoteResult): string {
  const rows = quote.breakdown
    .map(
      (item) =>
        `<tr style="border-bottom:1px solid #2a2a2a">
          <td style="padding:10px 16px;color:${item.type === "total" ? "#C9A765" : "#ccc"};font-weight:${item.type === "total" ? "bold" : "normal"}">${item.label}</td>
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
      <p style="color:#888;margin:0 0 24px;font-size:13px">Quote ID: <span style="color:#C9A765;font-family:monospace">${quote.quoteId}</span></p>
      <div style="background:#0a0a0a;border-radius:12px;padding:20px;margin-bottom:24px">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr><td style="padding:8px 0;color:#888">Vehicle</td><td style="padding:8px 0;color:#fff;text-align:right">${quote.vehicleName}</td></tr>
          <tr><td style="padding:8px 0;color:#888">From</td><td style="padding:8px 0;color:#fff;text-align:right">${quote.origin}</td></tr>
          <tr><td style="padding:8px 0;color:#888">To</td><td style="padding:8px 0;color:#fff;text-align:right">${quote.destination}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Distance</td><td style="padding:8px 0;color:#fff;text-align:right">${quote.distanceMiles.toFixed(1)} miles</td></tr>
          <tr><td style="padding:8px 0;color:#888">Duration</td><td style="padding:8px 0;color:#fff;text-align:right">${quote.durationHours} hours</td></tr>
        </table>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px">${rows}</table>
      <div style="margin-top:32px;text-align:center">
        <a href="https://luxrideelite.com/en/booking" style="background:linear-gradient(135deg,#C9A765,#D4AF37);color:#000;font-weight:bold;padding:16px 40px;border-radius:50px;text-decoration:none;font-size:16px;display:inline-block">Book Now</a>
      </div>
      <p style="color:#555;font-size:11px;text-align:center;margin-top:24px">Quote valid until ${quote.validUntil.toLocaleDateString()} · (305) 555-1234</p>
    </div>
  </div>
</body>
</html>`;
}
