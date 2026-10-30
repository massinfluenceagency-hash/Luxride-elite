import { NextRequest, NextResponse } from "next/server";
import { calculateRoute, RouteError } from "@/lib/server/geoapify";
const cache = new Map<string, { data: object; expires: number }>();
export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Please enter valid pickup and dropoff addresses." }, { status: 400 }); }
  const { origin, destination } = (body ?? {}) as { origin?: unknown; destination?: unknown };
  if (typeof origin !== "string" || typeof destination !== "string" || !origin.trim() || !destination.trim() || origin.length > 500 || destination.length > 500) {
    return NextResponse.json({ error: "Please enter valid pickup and dropoff addresses." }, { status: 400 });
  }
  const key = process.env.GEOAPIFY_API_KEY || process.env.Geoapify;
  if (!key) return NextResponse.json({ error: "Route calculation is temporarily unavailable. Please send your trip details to our team." }, { status: 503 });
  const cacheKey = JSON.stringify([origin.trim(), destination.trim()]);
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return NextResponse.json(cached.data);
  try {
    const result = await calculateRoute(origin.trim(), destination.trim(), key);
    if (cache.size >= 500) cache.clear();
    cache.set(cacheKey, { data: result, expires: Date.now() + 3600000 });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof RouteError ? error.message : "Distance calculation failed. Please try again or contact our team." }, { status: error instanceof RouteError ? error.status : 502 });
  }
}
