import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { data: object; expires: number }>();

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Please enter valid pickup and dropoff addresses." }, { status: 400 });
  }
  const { origin, destination } = (body ?? {}) as { origin?: unknown; destination?: unknown };
  if (typeof origin !== "string" || typeof destination !== "string" || !origin.trim() || !destination.trim() || origin.length > 500 || destination.length > 500) {
    return NextResponse.json({ error: "Please enter valid pickup and dropoff addresses." }, { status: 400 });
  }
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (!apiKey) return NextResponse.json({ error: "Route pricing is temporarily unavailable. Please contact us for an accurate quote." }, { status: 503 });
  const cacheKey = JSON.stringify([origin.trim(), destination.trim()]);
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return NextResponse.json(cached.data);
  try {
    const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({ origin: { address: origin.trim() }, destination: { address: destination.trim() }, travelMode: "DRIVE", routingPreference: "TRAFFIC_UNAWARE" }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return NextResponse.json({ error: "Route pricing is temporarily unavailable. Please try again or contact us." }, { status: 502 });
    const data = await response.json();
    const route = data.routes?.[0];
    if (!route) return NextResponse.json({ error: "We could not find a driving route. Please check both addresses or contact us for a quote." }, { status: 422 });
    const meters = route.distanceMeters;
    const duration = typeof route.duration === "string" && /^\d+(\.\d+)?s$/.test(route.duration) ? Number(route.duration.slice(0, -1)) : NaN;
    if (!Number.isFinite(meters) || meters < 0 || !Number.isFinite(duration)) throw new Error("Invalid route response");
    const result = {
      distanceMiles: meters / 1609.344, distanceKm: meters / 1000,
      durationMinutes: Math.round(duration / 60), durationText: Math.round(duration / 60) + " mins",
      distanceText: (meters / 1609.344).toFixed(1) + " mi",
    };
    if (cache.size >= 500) cache.clear();
    cache.set(cacheKey, { data: result, expires: Date.now() + 60 * 60 * 1000 });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Distance calculation failed. Please try again or contact us." }, { status: 502 });
  }
}
