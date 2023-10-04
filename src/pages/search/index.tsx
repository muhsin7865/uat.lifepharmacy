import { ProductsPage } from "@/components/products-page";
import getProductsSearchData from "@/lib/getProductsSearchData";

const SearchProducts = ({ productsData }: { productsData: any }) => {
  return (
    <ProductsPage
      isBrandsPage={false}
      isSearchPage={true}
      categoryData={productsData}
      type="search"
    />
  );
};

export default SearchProducts;

export async function getServerSideProps({ query }: { query: any }) {
  const productsData = await getProductsSearchData(query.term, 0);

  return {
    props: {
      productsData: productsData.data,
    },
  };
}
