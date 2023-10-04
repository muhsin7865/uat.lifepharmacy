export default async function getCategoryData() {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/categories`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}