export async function submitRequest(payload: Record<string, unknown>) {
  const response = await fetch("/api/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok || data.success !== true) {
    throw new Error(data.error || "Your request could not be sent. Please try again or call us.");
  }
}
