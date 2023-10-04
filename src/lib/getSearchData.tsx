export default async function getSearchDataSuggsetions(query: string) {

    var myHeaders = new Headers();
    myHeaders.append("X-Algolia-API-Key", "c54c5f0fc2e6bd0c3b97cfa5b3580705");
    myHeaders.append("X-Algolia-Application-Id", "WHCXS2GWOG");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "requests": [
        {
          "indexName": "products",
          "params": "query=" + query
        },
        {
          "indexName": "products_query_suggestions",
          "params": "query=" + query
        }
      ],
      "strategy": "none"
    });

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

   const res = await  fetch("https://WHCXS2GWOG-dsn.algolia.net/1/indexes/*/queries?lang=ae-en", requestOptions)

   if (!res.ok) throw new Error('failed to fetch data')

   return res.json()
}

