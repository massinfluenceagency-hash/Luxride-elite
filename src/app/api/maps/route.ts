import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { data: object; expires: number }>();

export async function POST(req: NextRequest) {
  try {
    const { origin, destination } = await req.json();
    if (typeof origin !== "string" || typeof destination !== "string" || !origin.trim() || !destination.trim() || origin.length > 500 || destination.length > 500) {
      return NextResponse.json({ error: "Missing origin or destination" }, { status: 400 });
    }

    const cacheKey = `${origin}|||${destination}`;
    const cached = cache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      return NextResponse.json(cached.data);
    }

    const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Route pricing is temporarily unavailable. Please contact us for an accurate quote." }, { status: 503 });
    }

    const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
    url.searchParams.set("origins", origin);
    url.searchParams.set("destinations", destination);
    url.searchParams.set("units", "imperial");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10000) });
    const data = await res.json();

    if (data.status !== "OK" || !data.rows?.[0]?.elements?.[0]) {
      return NextResponse.json({ error: "We could not find a driving route. Please check both addresses or contact us for a quote." }, { status: 422 });
    }

    const element = data.rows[0].elements[0];
    if (element.status !== "OK") {
      return NextResponse.json({ error: "We could not find a driving route. Please check both addresses or contact us for a quote." }, { status: 422 });
    }

    const distanceMeters: number = element.distance.value;
    const durationSeconds: number = element.duration.value;
    const result = {
      distanceMiles: distanceMeters / 1609.344,
      distanceKm: distanceMeters / 1000,
      durationMinutes: Math.round(durationSeconds / 60),
      durationText: element.duration.text,
      distanceText: element.distance.text,
    };

    if (cache.size >= 500) cache.clear();
    cache.set(cacheKey, { data: result, expires: Date.now() + 60 * 60 * 1000 });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Distance calculation failed" }, { status: 500 });
  }
}
