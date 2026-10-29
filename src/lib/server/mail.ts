import nodemailer from "nodemailer";

export class MailError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export async function sendMail(to: string, subject: string, html: string, replyTo?: string) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const host = process.env.SMTP_HOST || "smtp.ionos.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const from = process.env.MAIL_FROM || user;
  if (!user || !pass || !from || ![465, 587].includes(port)) {
    throw new MailError("Online requests are temporarily unavailable. Please call us to arrange your service.", 503);
  }
  const transport = nodemailer.createTransport({
    host, port, secure: port === 465, requireTLS: port === 587,
    auth: { user, pass },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "LuxRide Elite", address: from }, to, replyTo, subject, html,
    });
    if (!result.accepted?.length || result.rejected?.length) throw new Error("Recipient rejected");
  } catch {
    throw new MailError("Your request could not be sent. Please try again or call us.", 502);
  } finally { transport.close(); }
}
