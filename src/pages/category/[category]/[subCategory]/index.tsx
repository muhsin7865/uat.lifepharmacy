import { ProductsPage } from "@/components/products-page";
import getProductsDataByCat from "@/lib/getProductsDataByCat";

const SubCategory = ({ categoryData }: { categoryData: any }) => {
  return (
    <ProductsPage
      isBrandsPage={false}
      isSearchPage={false}
      categoryData={categoryData}
      type={"category"}
    />
  );
};

export default SubCategory;

export async function getServerSideProps(context: any) {
  const { params, locale } = context;

  const subCategory = params.subCategory;
  let filterPath = `categories=${subCategory}`;

  const categoryData = await getProductsDataByCat({
    filterPath,
    noOfProducts: 0,
    lang: locale,
    context
  });

  return {
    props: {
      categoryData: categoryData.data,
    },
  };
}

// export async function getStaticPaths() {
//   function slugify(text: string) {
//     return text.toLowerCase().replace(/[\/\s&]+/g, "-");
//   }

//   const categoryData = await getCategoryData();
//   const paths = categoryData.data.reduce((acc: any, category: any) => {
//     category.children.forEach((child: any) => {
//       acc.push({
//         params: {
//           category: slugify(category.name),
//           subCategory: child.slug,
//         },
//       });
//     });
//     return acc;
//   }, []);

//   return {
//     paths,
//     fallback: "blocking",
//   };
// }
