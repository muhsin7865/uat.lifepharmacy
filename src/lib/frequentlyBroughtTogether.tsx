export default async function getFrequentlyBroughtTogetherData(
  id: string,
  lang: any
) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/frequently-brought-together/${id}?lang=${lang}`
  );

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
