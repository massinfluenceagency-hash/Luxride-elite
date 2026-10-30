# LuxRide Elite: inquiry and reservation delivery

## Changes in this branch

Contact, vehicle reservation, and tour requests now post to a validated server endpoint and are emailed to the business inbox. Success appears only after the email provider accepts the message. Reservations are requests for availability, not confirmed purchases or guaranteed bookings.

Quote emails now validate their input, reconstruct dates serialized by the browser, escape customer-provided HTML, and surface delivery errors. Missing email settings return an unavailable error rather than false success.

The route calculator no longer invents mileage based on address length or silently uses a 15-mile default. It requires a successful Geoapify driving-route response before calculating a price.

Vehicle quote rates now come from the same fleet data used by the public listings. Vehicle detail quotes initially select the vehicle being viewed. Tour prices are flat vehicle time-package prices throughout cards, detail pages, forms, and request emails. Only the vehicle, chauffeur, and agreed pickup/drop-off are included. Activity admission, meals, drinks, equipment, and third-party services are explicitly excluded and paid separately by guests. Suggested stops are optional rather than guaranteed activities. Half Day packages cover 3–4 hours; Full Day packages cover 6–8 hours, as confirmed by the owner. The business phone number in quote emails matches the existing site-wide phone update. Placeholder social links and the nonexistent Careers destination are removed; footer and contact phone/email links are actionable.

Search discovery now includes robots.txt and a multilingual sitemap with the main pages, vehicles, and tours. The live site returned 404 for both discovery files before this update.

## Required hosting settings

This project requires a running Next.js Node.js server because it uses API routes and locale middleware. A static upload alone cannot run these features.

Set these server environment variables in the hosting service, using `.env.example` as the names-only template:

- `SMTP_HOST`: `smtp.ionos.com`.
- `SMTP_PORT`: `465` (implicit TLS), or `587` (required STARTTLS).
- `SMTP_USER`: `info@luxrideelite.com`.
- `SMTP_PASSWORD`: the password for that mailbox, entered directly in Vercel as a sensitive variable.
- `MAIL_FROM`: `info@luxrideelite.com`.
- `BOOKING_EMAIL`: the business inbox that should receive all contact and reservation requests.
- `GEOAPIFY_API_KEY`: private Geoapify project API key, stored as sensitive for Production and Preview. Calls run on the server; never use a NEXT_PUBLIC prefix. The server geocodes both US addresses with a Miami proximity bias, then computes an actual driving route. No Google billing account is required. Include Geoapify and OpenStreetMap attribution with route results.

Keep real credentials out of GitHub and chat. Build with the existing build command and run the existing start command. Restart or redeploy after changing environment variables.

Without those settings, visitors see an honest unavailable message and can contact the business directly. Provider acceptance does not prove delivery to an inbox; verify a real business-owned test inquiry after configuring production.

## Validation

- `node scripts/test-requests.cjs`: Geoapify and inquiry regression checks covering validation, missing configuration, quote date serialization, escaped email content, provider errors, and successful mocked delivery. No real emails are sent.
- `node node_modules/typescript/bin/tsc --noEmit`: type check.
- `node node_modules/next/dist/bin/next build`: production build.

## Still needs owner confirmation

- Hosting is confirmed as Vercel project luxride-elite; Hostinger manages domain DNS, and IONOS manages the mailbox. Add the private mailbox password in Vercel and verify delivery before publication.
- Supply the earlier marketing audit so its remaining findings can be addressed accurately.
- Verify actual email delivery and live route calculations once the hosting settings are present.

This branch does not change the current live website or hosting account.
