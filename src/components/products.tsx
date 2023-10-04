import ProductsSlider from "./products-slider";
import useSWR from "swr";
import { ProductsSkeleton } from "./productsSkeleton";
import { useRouter } from "next/router";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useSession } from "next-auth/react";

const Products = ({
  slug,
  type_key,
  proMetadata,
}: {
  slug: string;
  type_key: string;
  proMetadata: any;
}) => {
  switch (type_key) {
    case "collection":
      type_key = "collections";
      break;

    case "category":
      type_key = "categories";
      break;

    case "brand":
      type_key = "brands";
      break;
  }
  const { locale, getLatLngData } = useLanguage();
  const { data: session } = useSession();

  const fetcher = (url: string) => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Latitude: getLatLngData(),
        Longitude: getLatLngData(),
      },
    };
    return fetch(url, requestOptions).then((res) => res.json());
  };

  const url = `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/web/products?${type_key}=${slug}&order_by=popularity&type=cols&skip=0&take=7&new_method=true&lang=${locale}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  const router = useRouter();

  return (
    <div className="container-page-items">
      <div style={{ background: proMetadata.settings.background_value }}>
        {proMetadata.settings.show_section_title ? (
          <div className="flex justify-between pt-3 mx-4 items-center ">
            <Typography type="h4" size={"xl"} bold={"semibold"}>
              {proMetadata.section_title}
            </Typography>
            <Button
              rounded={"sm"}
              onClick={() => {
                router.push(
                  {
                    pathname: `/products`,
                    query: {
                      collections: `${proMetadata.section_data_object.slug}`,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            >
              View All
            </Button>
            {/* <button onClick={() => { router.push(`/products?collections=${proMetadata.section_data_object.slug}`) }} className="bg-[#39f] px-3 text-white text-xs flex items-center rounded py-2 leading-none"><span>View All</span> </button> */}
          </div>
        ) : null}
        {data ? (
          <ProductsSlider proData={data.data.products} />
        ) : (
          <div className="flex overflow-x-auto no-scrollbar space-x-3 rtl:space-x-reverse p-3">
            {Array(6).fill(<ProductsSkeleton />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
