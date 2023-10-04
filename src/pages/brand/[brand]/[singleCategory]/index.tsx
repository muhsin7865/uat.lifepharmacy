import { ProductsPage } from "@/components/products-page";
import getBrandProductData from "@/lib/getBrandProductData";

export default function SingleBrandPage({
  brandsProductsData,
}: {
  brandsProductsData: any;
}) {
  return (
    <ProductsPage
      isBrandsPage={true}
      isSearchPage={false}
      categoryData={brandsProductsData}
      type={"products"}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  locale,
  params,
}: {
  locale: any;
  params: any;
}) {
  const brandsProductsData = await getBrandProductData(
    params.brand,
    params.singleCategory,
    "",
    0,
    locale
  );
  return {
    props: {
      brandsProductsData: brandsProductsData.data,
    },
  };
}
