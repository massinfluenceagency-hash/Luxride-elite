# LuxRide Elite: inquiry and reservation delivery

## Changes in this branch

Contact, vehicle reservation, and tour requests now post to a validated server endpoint and are emailed to the business inbox. Success appears only after the email provider accepts the message. Reservations are requests for availability, not confirmed purchases or guaranteed bookings.

Quote emails now validate their input, reconstruct dates serialized by the browser, escape customer-provided HTML, and surface delivery errors. Missing email settings return an unavailable error rather than false success.

The route calculator no longer invents mileage based on address length or silently uses a 15-mile default. It requires a successful Google Maps response before calculating a price.

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

- `node scripts/test-requests.cjs`: 15 checks covering validation, missing configuration, quote date serialization, escaped email content, provider errors, and successful mocked delivery. No real emails are sent.
- `node node_modules/typescript/bin/tsc --noEmit`: type check.
- `node node_modules/next/dist/bin/next build`: production build.

## Still needs owner confirmation

- Confirm the live Hostinger URL and which Hostinger service runs the application.
- Confirm the correct business phone number: the contact page uses 1 (800) 240-4727 while the quote email contains (786) 948-2298.
- Supply the earlier marketing audit so its remaining findings can be addressed accurately.
- Verify actual email delivery and live route calculations once the hosting settings are present.

This branch does not change the current live website or hosting account.
