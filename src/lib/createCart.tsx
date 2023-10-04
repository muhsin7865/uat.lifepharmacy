export default async function createCartPOSTReq(payLoadData: string) {

    var myHeaders = new Headers();
    myHeaders.append("Latitude", "25.21937");
    myHeaders.append("Longitude", "55.272887");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(payLoadData);

    
    var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/carts/v2/create`, requestOptions)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}

