import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function getProductsDataByCat({
  filterPath,
  noOfProducts,
  lang,
  context,
  clientSideSessionData,
}: {
  filterPath: string;
  noOfProducts: number;
  lang: any;
  context?: any;
  clientSideSessionData?: any;
}) {
  const session = !clientSideSessionData
    ? await getServerSession(context.req, context.res, authOptions)
    : clientSideSessionData;

  var requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Latitude: String(session?.token?.selected_address?.latitude || 25.192622),
      Longitude: String(session?.token?.selected_address?.longitude || 55.276383),
    },
  };

  const urlPath = `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/web/products?${`${filterPath}&`}type=cols&skip=${noOfProducts}&take=40&channel=web&new_method=true&lang=${lang}`;

  const res = await fetch(urlPath, requestOptions);

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
