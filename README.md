# LuxRide Elite: inquiry and reservation delivery

## Changes in this branch

Contact, vehicle reservation, and tour requests now post to a validated server endpoint and are emailed to the business inbox. Success appears only after the email provider accepts the message. Reservations are requests for availability, not confirmed purchases or guaranteed bookings.

Quote emails now validate their input, reconstruct dates serialized by the browser, escape customer-provided HTML, and surface delivery errors. Missing email settings return an unavailable error rather than false success.

The route calculator no longer invents mileage based on address length or silently uses a 15-mile default. It requires a successful Google Maps response before calculating a price.

Vehicle quote rates now come from the same fleet data used by the public listings. Vehicle detail quotes initially select the vehicle being viewed. Tour prices are flat vehicle time-package prices throughout cards, detail pages, forms, and request emails. Only the vehicle, chauffeur, and agreed pickup/drop-off are included. Activity admission, meals, drinks, equipment, and third-party services are explicitly excluded and paid separately by guests. Suggested stops are optional rather than guaranteed activities. Half Day packages cover 3–4 hours; Full Day packages cover 6–8 hours, as confirmed by the owner. The business phone number in quote emails matches the existing site-wide phone update. Placeholder social links and the nonexistent Careers destination are removed; footer and contact phone/email links are actionable.

Search discovery now includes robots.txt and a multilingual sitemap with the main pages, vehicles, and tours. The live site returned 404 for both discovery files before this update.

## Required hosting settings

This project requires a running Next.js Node.js server because it uses API routes and locale middleware. A static upload alone cannot run these features.

Set these server environment variables in the hosting service, using `.env.example` as the names-only template:

- `SENDGRID_API_KEY`: an API key with mail sending permission.
- `MAIL_FROM`: a sender address verified in SendGrid.
- `BOOKING_EMAIL`: the business inbox that should receive all contact and reservation requests.
- `GOOGLE_MAPS_SERVER_KEY`: a server key authorized for the Google Distance Matrix API used by the existing implementation.

Keep real credentials out of GitHub and chat. Build with the existing build command and run the existing start command. Restart or redeploy after changing environment variables.

Without those settings, visitors see an honest unavailable message and can contact the business directly. Provider acceptance does not prove delivery to an inbox; verify a real business-owned test inquiry after configuring production.

## Validation

- `node scripts/test-requests.cjs`: 18 checks covering validation, missing configuration, quote date serialization, escaped email content, provider errors, and successful mocked delivery. No real emails are sent.
- `node node_modules/typescript/bin/tsc --noEmit`: type check.
- `node node_modules/next/dist/bin/next build`: production build.

## Still needs owner confirmation

- Confirm which Hostinger service runs https://www.luxrideelite.com and configure its server environment.
- Supply the earlier marketing audit so its remaining findings can be addressed accurately.
- Verify actual email delivery and live route calculations once the hosting settings are present.

This branch does not change the current live website or hosting account.
