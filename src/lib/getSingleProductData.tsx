export default async function getSingleProductData(lang:string, slug:any) {
    const urlPath =`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/web/products/details?product_slug=${slug}&new_method=true&lang=${lang}`
    
    const res = await fetch(urlPath)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}