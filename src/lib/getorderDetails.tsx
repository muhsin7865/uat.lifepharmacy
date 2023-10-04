export default async function getOrderDetails(sessionToken:any) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/orders?skip=0&take=5&lang=ae-en`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
    }
    }
  );
  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
