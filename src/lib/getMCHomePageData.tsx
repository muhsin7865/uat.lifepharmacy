export default async function getMCHomePageData() {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/clinics/v1/home`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}