export default async function getSinglePageData(params:any) {

    const res = await fetch(`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/cms/page/${params}`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}