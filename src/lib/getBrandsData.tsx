export default async function getBrandsData(isAlphabetic:boolean) {
    
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/web/brands${isAlphabetic?"-by-alphabetic":""}`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}


