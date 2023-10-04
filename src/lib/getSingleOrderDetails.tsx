export default async function getSingleOrderDetails(orderId: string) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/orders/${orderId}`,
    {
        headers: {
            Authorization: `Bearer ${"408933214|ioBpRoFyCvMKKTK0gSq8Wtby4ct1zMFXl1ByyI5V"}`
        }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Data");

  return res.json();
}
