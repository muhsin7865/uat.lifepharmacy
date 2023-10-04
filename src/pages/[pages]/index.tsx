import { GetStaticProps } from "next";
import getHomePageData from "@/lib/getHomePageData";
import getSinglePageData from "@/lib/getSinglePageData";
import PageStructure from "@/components/page-structure";


const PageData = ({ pageData }: { pageData: any}) => {
  return pageData.map((data: any, ind: number) => (
    <PageStructure data={data}  />
  ));
};

export default PageData;

export const getStaticPaths = async (context: any) => {
  const data_res = await getHomePageData(context.params?.locale);

  const slugs = data_res.data.content
    .flatMap((section: any) =>
      section.section_type != "product_grid" &&
        section.section_type != "gap" &&
        (section.settings.hide_in_desktop_web === false ||
          section.settings.hide_in_desktop_web === null ||
          section.settings.hide_in_mobile_web === false ||
          section.settings.hide_in_mobile_web === null) &&
        section.section_data_array
        ? section.section_data_array.map((secDataArray: any) =>
          secDataArray.type_key === "page" ? secDataArray.slug : null
        )
        : null
    )
    .filter((slug: any) => slug != null);

  const paths = [...new Set(slugs)].map((slug) => ({
    params: {
      pages: slug,
    },
  }));

  return {
    fallback: "blocking",
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pagesParams = context.params?.pages;

  const pageData = await getSinglePageData(pagesParams);

  if (!pageData.success) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData: pageData.data.content,
    },
  };
};
