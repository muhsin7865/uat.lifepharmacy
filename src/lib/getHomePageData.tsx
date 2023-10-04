export default async function getHomePageData(lang:any) {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/cms/page/home?lang=${lang}`)

    if (!res.ok) throw new Error('failed to fetch data')
    
    return res.json()
}