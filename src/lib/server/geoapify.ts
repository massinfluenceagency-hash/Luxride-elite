type Location = { lat: number; lon: number; formatted: string };
const locations = new Map<string, { value: Location; expires: number }>();

export class RouteError extends Error {
  constructor(message: string, public status = 502) { super(message); }
}

async function request(url: URL) {
  // Never log this URL: it includes the private API key and customer addresses.
  const response = await fetch(url.toString(), { signal: AbortSignal.timeout(12000), cache: "no-store" });
  if (!response.ok) {
    console.error("Geoapify request failed", { status: response.status, endpoint: url.pathname });
    throw new RouteError("Route calculation is temporarily unavailable. Please try again or send your trip details to our team.");
  }
  return response.json();
}

async function geocode(address: string, key: string): Promise<Location> {
  const cached = locations.get(address);
  if (cached && cached.expires > Date.now()) return cached.value;
  const url = new URL("https://api.geoapify.com/v1/geocode/search");
  url.search = new URLSearchParams({ text: address, format: "json", limit: "1", filter: "countrycode:us", bias: "proximity:-80.1918,25.7617", apiKey: key }).toString();
  const data = await request(url);
  const result = data.results?.[0];
  if (!result || !["building", "amenity", "street"].includes(result.result_type) || !Number.isFinite(result.rank?.confidence) || result.rank.confidence < 0.6) {
    throw new RouteError("We could not identify an exact pickup or dropoff. Please enter the full street address, city, and ZIP code, or contact our team.", 422);
  }
  if (!Number.isFinite(result.lat) || !Number.isFinite(result.lon) || Math.abs(result.lat) > 90 || Math.abs(result.lon) > 180 || typeof result.formatted !== "string") {
    throw new RouteError("The address could not be verified. Please check the full address or contact our team.", 422);
  }
  const value = { lat: result.lat, lon: result.lon, formatted: result.formatted };
  if (locations.size >= 500) locations.clear();
  locations.set(address, { value, expires: Date.now() + 3600000 });
  return value;
}

export async function calculateRoute(origin: string, destination: string, key: string) {
  const [start, end] = await Promise.all([geocode(origin, key), geocode(destination, key)]);
  const url = new URL("https://api.geoapify.com/v1/routing");
  url.search = new URLSearchParams({ waypoints: `${start.lat},${start.lon}|${end.lat},${end.lon}`, mode: "drive", units: "metric", apiKey: key }).toString();
  const data = await request(url);
  const route = data.features?.[0]?.properties;
  if (!route) throw new RouteError("We could not find a driving route. Check both addresses or contact our team.", 422);
  if (!Number.isFinite(route.distance) || route.distance < 0 || !Number.isFinite(route.time) || route.time < 0 || route.distance_units !== "Meters") {
    throw new RouteError("The route response could not be verified. Please try again or contact our team.");
  }
  return {
    distanceMiles: route.distance / 1609.344, distanceKm: route.distance / 1000,
    durationMinutes: Math.round(route.time / 60), durationText: Math.round(route.time / 60) + " mins",
    distanceText: (route.distance / 1609.344).toFixed(1) + " mi",
    resolvedOrigin: start.formatted, resolvedDestination: end.formatted,
    provider: "geoapify",
  };
}
