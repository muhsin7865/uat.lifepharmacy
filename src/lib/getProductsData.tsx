export default async function getProductsData(lang:string, catName:string, type_key:string) {
    switch(type_key){
        case "collection":
            type_key = "collections" 
            break

        case "category":    
        type_key = "categories"
        break

    }
    const urlPath =`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/web/products?${type_key}=${catName}&order_by=popularity&type=cols&skip=0&take=7&new_method=true&lang=${lang}`
    
    const res = await fetch(urlPath)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}