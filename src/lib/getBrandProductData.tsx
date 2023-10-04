export default async function getBrandProductData(
  brandName: any,
  catSlug: any,
  filterPath: string,
  noOfProducts: number,
  lang: any
) {
  const url = `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/web/brands/details/${brandName}?${
    catSlug != "" ? `category_slug=${catSlug}&` : ""
  }${
    filterPath ? `${filterPath}&` : "orderBy=popularity&"
  }type=cols&skip=${noOfProducts}&take=40&new_method=true&lang=${lang}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
