import { ProductsPage } from "@/components/products-page";
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import { stringify } from "querystring";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Products = ({ productsData }: { productsData: any }) => {
  return (
    <ProductsPage
      isBrandsPage={false}
      isSearchPage={false}
      categoryData={productsData}
      type={"products"}
    />
  );
};

export default Products;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const { query } = context;

  const { locale } = context;

  const productsData = await getProductsDataByCat({
    filterPath: stringify(query),
    noOfProducts: 0,
    lang: locale,
    context,
  });
  return {
    props: {
      productsData: productsData.data,
    },
  };
}
