export default async function getProductsSearchData(term: string, noOfProducts: number) {
    const api = `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v2/search${term != "" ? `?term=${term}` : ''}&order_by=popularity&type=cols&skip=${noOfProducts}&take=40&new_method=true&lang=ae-en`

    const res = await fetch(api)
    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}