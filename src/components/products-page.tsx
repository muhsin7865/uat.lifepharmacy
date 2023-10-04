import React from "react";
import { useState } from "react";
import ProductsPageData from "./products-page-data";
import Image from "next/image";
import BreadCrumb from "./breadcrumb";
import { useRouter } from "next/router";

export const ProductsPage = ({
  isSearchPage,
  categoryData,
  type,
  isBrandsPage,
}: {
  categoryData: any;
  isSearchPage: boolean;
  type: string;
  isBrandsPage: boolean;
}) => {
  const [readMoreClick, setReadMoreClick] = useState(false);
  const router = useRouter();
  
  const { query } = router;
  const { pathname } = router;
  const productsSubQuery =
    query.collections || query.categories || query.brands || "";
  const menuData = [ String(pathname).replace('/', ''), productsSubQuery.toString()];

  return (
    <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]">
      {(categoryData.filters &&
        categoryData.filters.categories &&
        categoryData.filters.categories[0] &&
        categoryData.filters.categories[0].images &&
        categoryData.filters.categories[0].images.banner) ||
      (isBrandsPage && categoryData.brand_details.images.banner) ? (
        <div className="">
          {isBrandsPage ? (
            <Image
              src={categoryData.brand_details.images.banner}
              height={500}
              width={1440}
              alt="headerimg"
              className="object-cover lg:h-[20rem] md:h-[15rem] w-full mx-auto "
            />
          ) : (
            <Image
              src={categoryData.filters.categories[0].images.banner}
              height={500}
              width={1440}
              alt="headerimg"
              className="object-cover lg:h-[20rem] md:h-[15rem] w-full mx-auto "
            />
          )}
          <BreadCrumb type={type} menuData={menuData}/>

          {isBrandsPage
            ? categoryData.brand_details.short_description && (
                <div className="relative">
                  <p
                    className={`text-sm text-gray-600 my-5 ${
                      readMoreClick ? "" : "overflow-y-hidden h-[7rem]"
                    } text-ellipsis leading-7`}
                    dangerouslySetInnerHTML={{
                      __html: categoryData.brand_details.short_description,
                    }}
                  />
                  <div
                    className={`absolute -bottom-6 left-0 right-0 text-center ${
                      readMoreClick
                        ? ""
                        : "bg-gradient-to-b from-transparent to-white"
                    } pt-16`}
                  >
                    <button
                      onClick={() => setReadMoreClick(!readMoreClick)}
                      className=" rounded-full text-sm bg-white border border-muted hover:bg-slate-100 hover:text-blue-500 p-1 px-2"
                    >
                      Read {readMoreClick ? "Less" : "More"}
                    </button>
                  </div>
                </div>
              )
            : categoryData.model_details.short_description && (
                <div className="relative">
                  <p
                    className={`text-sm text-gray-600 my-5  ${
                      readMoreClick ? "" : "overflow-y-hidden h-[7rem]"
                    } text-ellipsis leading-7`}
                    dangerouslySetInnerHTML={{
                      __html: categoryData.model_details.short_description,
                    }}
                  />
                  <div
                    className={`absolute -bottom-6 left-0 right-0 text-center ${
                      readMoreClick
                        ? ""
                        : "bg-gradient-to-b from-transparent to-white"
                    } pt-16`}
                  >
                    <button
                      onClick={() => setReadMoreClick(!readMoreClick)}
                      className=" rounded-full text-sm bg-white border border-muted hover:bg-slate-100 hover:text-blue-500 p-1 px-2"
                    >
                      Read {readMoreClick ? "Less" : "More"}
                    </button>
                  </div>
                </div>
              )}
        </div>
      ) : (
        <>
          <div className=" h-[12em] px-[10px] items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y lg:grid hidden">
            <div className="my-auto space-y-2">
              {menuData[0] ? (
                <h1 className="text-4xl text-center capitalize">
                  {menuData[0]}
                </h1>
              ) : null}
              <h1 className="text-2xl  text-center   capitalize text-blue-500">
                {menuData[1] ? menuData[1] : " Products"}{" "}
              </h1>
            </div>
          </div>
          <BreadCrumb type={type} menuData={menuData}/>
        </>
      )}
      <ProductsPageData
        categoryData={categoryData}
        brandsData={categoryData.brands}
        isSearchPage={isSearchPage}
        isBrandsPage={isBrandsPage}
      />
    </div>
  );
};
