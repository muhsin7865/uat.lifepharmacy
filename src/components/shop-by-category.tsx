import { SetStateAction, useEffect, useState } from "react";
import { animate, motion, motionValue } from "framer-motion";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { Typography } from "./ui/typography";
import { Icon } from "./ui/icons";
import Link from "next/link";
import { BrandsSkeleton } from "./skeletons";
import { useSession } from "next-auth/react";
const ShopByCatContent = ({
  data,
  navigationTriggerState,
}: {
  data: any;
  navigationTriggerState: (state: boolean) => void;
}) => {
  const { locale } = useLanguage();

  const { width } = useWindowDimensions();
  const noOfBrands = () => {
    return width > 1280 ? 7 : width > 991 ? 6 : 4;
  };
  const [itemHoverActive, setItemHoverActive] = useState<any>(null);
  const [hoverIndex, setHoverIndex] = useState<any>(0);
  const [subCatIndex, setSubCatIndex] = useState<any>(0);
  const [topBrandsData, setTopBrandsData] = useState<any>([]);
  const [topBrandsLoadingState, setTopBrandsLoadingState] =
    useState<any>(false);
  const [singleCatBrandData, setSingleCatBrandData] = useState<any>(null);
  const [topBrandsTimer, setTopBrandsTimer] = useState<any>(null);
  function generatePath(grand_p: string, parent: string, child: string) {
    return `/category/${slugify(grand_p)}/${parent}/${slugify(child)}`;
  }
  const x = motionValue(0);

  animate(x, 0, { duration: 0.1 });

  const {data:session} = useSession()

  const fetchTopBrandsData = (filterPath: any, path: any) => {
    const topBrandsDataExists = topBrandsData.some(
      (brandsData: any) => brandsData.type === path
    );
    if (!topBrandsDataExists) {
      setTopBrandsLoadingState(true);

      clearTimeout(topBrandsTimer);

      const fetchDataTimer = setTimeout(() => {
        getProductsDataByCat({filterPath:filterPath, noOfProducts:0, lang:locale, clientSideSessionData:session} ).then((data) => {
          setTopBrandsData([
            ...topBrandsData,
            { brands: [...data.data.brands], type: path },
          ]);

          setTopBrandsLoadingState(false);

          setSingleCatBrandData(data.data.brands);
        });
      }, 500);

      setTopBrandsTimer(fetchDataTimer);
    } else {
      const singleCat = topBrandsData.filter(
        (brandsData: any) => brandsData.type === path
      );
      setSingleCatBrandData(singleCat[0].brands);
    }
  };

  function slugify(text: string) {
    return text.toLowerCase().replace(/[\s&/]+/g, "-");
  }

  useEffect(() => {
    fetchTopBrandsData(`categories=${"facial-skin-care"}`, "facial-skin-care");
  }, []);

  return (
    <div className="grid grid-cols-12">
      <div className=" xl:col-span-2 col-span-3  h-[406px] overflow-hidden ">
        {data.data.map((item: any, i: number) => (
          <button
            onMouseOver={() => {
              setSubCatIndex(0);
              setHoverIndex(i);
              data.data
                .slice(hoverIndex, hoverIndex + 1)
                .map((item: any, i: number) =>
                  item.children
                    .slice(subCatIndex, subCatIndex + 1)
                    .map((itm: any) =>
                      fetchTopBrandsData(`categories=${itm.slug}`, itm.slug)
                    )
                );
              setItemHoverActive(null);
            }}
            className={`relative py-1 w-full flex justify-between px-2 text-sm items-center  `}
          >
            {hoverIndex === i ? (
              <motion.div
                transition={{ duration: 0.3 }}
                className="bg-slate-100  absolute left-0 right-0 h-full bottom-0 z-0"
                layoutId="underline"
              />
            ) : null}
            <div className="space-x-2 flex items-center z-10 overflow-hidden rtl:space-x-reverse">
              <div className="h-[50px] w-[50px]  border-2 border-slate-300/50 rounded-full">
                <Image
                  src={`/images/${slugify(item.name)}.webp`}
                  width={50}
                  height={50}
                  className="rounded-full w-full"
                  alt={item.name}
                />
              </div>
              <Typography
                size={"xs"}
                whitespace={"nowrap"}
                textElipssis={"textElipssis"}
              >
                {item.name}
              </Typography>
            </div>
            <Icon sizes={"xs"} type="chevronRightIcon" className="z-10" />
          </button>
        ))}
      </div>
      <div className="col-span-3 xl:col-span-2 bg-slate-100 overflow-y-auto overflow-x-hidden h-[406px]  ">
        {data.data.slice(hoverIndex, hoverIndex + 1).map((item: any) =>
          item.children.map((itm: any, i: number) => (
            <button
              onMouseOver={() => {
                setSubCatIndex(i);
                fetchTopBrandsData(`categories=${itm.slug}`, itm.slug);
                setItemHoverActive(null);
              }}
              className={`relative py-1 flex px-4 justify-between w-full text-sm items-center`}
            >
              {subCatIndex === i ? (
                <motion.div
                  transition={{ duration: 0.3 }}
                  className="bg-slate-200 d absolute left-0 right-0 h-full z-0"
                  layoutId="layoutIdunique"
                />
              ) : null}
              <div className="space-x-2 rtl:space-x-reverse flex items-center z-10 overflow-hidden">
                <div className="h-[50px] w-[50px] border-2 border-slate-200 rounded-full">
                  <Image
                    src={
                      itm.sections[0] && itm.sections[0].images.logo
                        ? itm.sections[0].images.logo
                        : "/images/default-product-image.png"
                    }
                    height={50}
                    width={50}
                    alt={itm.name}
                    className="w-full rounded-full"
                  />
                </div>
                <Typography
                  size={"xs"}
                  whitespace={"nowrap"}
                  textElipssis={"textElipssis"}
                >
                  {itm.name}
                </Typography>
              </div>
              <Icon sizes={"xs"} type="chevronRightIcon" className="z-10" />
            </button>
          ))
        )}
      </div>
      <div className=" xl:col-span-8 col-span-6  px-4 bg-white max-h-[406px] ">
        <div className="grid xl:grid-cols-4 grid-cols-3 gap- py-2 relative overflow-x-hidden overflow-y-auto max-h-[270px]">
          {data.data
            .slice(hoverIndex, hoverIndex + 1)
            .map((item: any, i: number) =>
              item.children
                .slice(subCatIndex, subCatIndex + 1)
                .map((itm: any) =>
                  itm.sections.map((sec: any, indx: number) =>
                    sec.images.logo ? (
                      <Link
                        onMouseOver={() => setItemHoverActive(indx)}
                        className=" group/catImage relative lg:flex block  items-center p-3 rounded-xl"
                        href={generatePath(item.name, itm.slug, sec.name)}
                        onClick={() => navigationTriggerState(false)}
                      >
                        <Image
                          src={sec.images.logo}
                          alt={sec.name}
                          width={50}
                          height={50}
                          className={`z-10 ${
                            itemHoverActive === indx
                              ? "scale-110"
                              : "border-muted"
                          } lg:mx-0 mx-auto  border-4 rounded-full max-h-[60px] max-w-[60px]`}
                        />
                        {/* <p className="z-10 text-xs lg:ml-3 ml-0 lg:text-left text-center lg:mt-0 mt-3 text-black" style={{ wordBreak:te "break-all" }} >{sec.name}</p> */}
                        <Typography
                          size={"xs"}
                          type="p"
                          whitespace={"nowrap"}
                          textElipssis={"textElipssis"}
                          className="lg:ml-3 ml-0 lg:text-left text-center lg:mt-0 mt-3 z-10"
                          style={{ wordBreak: "break-all" }}
                        >
                          {sec.name}
                        </Typography>
                        {itemHoverActive === indx ? (
                          <motion.div
                            transition={{ duration: 0.3 }}
                            className="bg-slate-200/60  absolute left-0 right-0 h-full  z-0 rounded-lg"
                            layoutId="itemsLayouts"
                          />
                        ) : null}
                      </Link>
                    ) : null
                  )
                )
            )}
        </div>
        <div className="  py-1 ">
          <Typography size={"lg"} bold={"bold"} className="text-left" type="h3">
            TOP BRANDS
          </Typography>
          <div className="grid xl:grid-cols-7 lg:grid-cols-6 gap-3 grid-cols-4 py-2">
            {singleCatBrandData && !topBrandsLoadingState ? (
              singleCatBrandData
                .slice(0, noOfBrands())
                .map((brandData: any) => (
                  <Link
                    className="group/brand relative "
                    href={`/brand/${brandData.slug}`}
                    onClick={() => navigationTriggerState(false)}
                  >
                    <Image
                      src={
                        brandData.images.logo
                          ? brandData.images.logo
                          : "/images/default-product-image.png"
                      }
                      height={80}
                      width={80}
                      className="mx-auto group-hover/brand:shadow-lg group-hover/brand:shadow-blue-200 duration-100 transition-shadow shadow bg-white rounded-lg"
                      alt="brand-img"
                    />
                    <div className="absolute  left-0 right-0 bottom-0 bg-emerald-200  w-fit mx-auto rounded-tl-lg rounded-tr-lg px-1">
                      <Typography
                        size={"xs"}
                        type="p"
                        whitespace={"nowrap"}
                        textElipssis={"textElipssis"}
                        alignment={"horizontalCenter"}
                      >
                        {brandData.name}
                      </Typography>
                    </div>
                  </Link>
                ))
            ) : (
              <BrandsSkeleton noOfSuggestions={noOfBrands()} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCatContent;
