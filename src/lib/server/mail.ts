export class MailError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export async function sendMail(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.SENDGRID_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) {
    throw new MailError("Online requests are temporarily unavailable. Please call us to arrange your service.", 503);
  }
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "LuxRide Elite" },
      ...(replyTo ? { reply_to: { email: replyTo } } : {}),
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });
  if (!response.ok) throw new MailError("Your request could not be sent. Please try again or call us.", 502);
}
