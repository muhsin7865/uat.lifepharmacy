import * as Accordion from "@radix-ui/react-accordion";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./accordion-radix";

import { UserPreferenceBtn } from "./Button";
import { FC, useEffect, useState } from "react";
import getCategoryData from "@/lib/getCategoryData";
import { Icon } from "./ui/icons";
import { Checkbox } from "./ui/checkbox";
import { Typography, typographyVariants } from "./ui/typography";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { useLanguage } from "@/hooks/useLanguage";
import { FilterIcon } from "lucide-react";
import Image from "next/image";
import { SideBarMenuTranstion } from "./ui/transition";

interface FilterProps {
  brandsData: any;
}

const FiltersSection: FC<FilterProps> = ({ brandsData }) => {
  const [catData, setCatData] = useState({
    data: [{}],
  });
  useEffect(() => {
    getCategoryData().then((cat_data) => {
      setCatData(cat_data);
    });
  }, []);

  const { currentCountryDetails } = useLanguage();

  const router = useRouter();
  const brandsQuery = router.query.brands?.toString();

  console.log(router.query.brands?.toString());

  const brandsArray = brandsQuery?.split(",") || [];

  console.log(brandsArray.toString());

  const rangeSliderValueChange = (newValue: number[]) => {
    setRangeSliderValue([newValue[0], newValue[1]]);
  };

  const removeBrand = (brandTobeRemoved: string) => {
    router.push(
      {
        query: {
          ...router.query,
          brands: brandsArray
            .filter((brand) => brand !== brandTobeRemoved)
            .join(","),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const addBrand = (newBrand: string) => {
    brandsArray.push(newBrand);
    router.push(
      {
        query: {
          ...router.query,
          brands: brandsArray.join(","),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  function slugify(text: any) {
    if (text) {
      return text.toLowerCase().replace(/[\/\s&]+/g, "-");
    } else {
      return "";
    }
  }

  function generatePath(slug: string) {
    router.push({
      query: {
        categories: slug,
      },
    });
  }

  const [rangeSliderValue, setRangeSliderValue] = useState([
    Number(router.query.min_price) || 0,
    Number(router.query.max_price) || 9999,
  ]);
  const [checkedCat, setCheckedCat] = useState<any>({
    item: null,
    checkedState: false,
  });

  const [instantCheckedState, setInstantChecked] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);

  useEffect(() => {
    setCheckedCat({
      item: router.query.categories
        ? router.query.categories
        : router.query.collections
        ? router.query.collections
        : "",
      checkedState: true,
    });
  }, [router.query]);

  return (
    <>
      <SideBarMenuTranstion
        customWidthBreakPoint={991}
        isOpen={sideBarState}
        setIsClosed={setSideBarState}
      >
        <div className=" lg:px-0 p-3 overflow-y-auto">
          {catData.data[1] ? (
            <>
              <Accordion.Root
                className=""
                type="single"
                defaultValue="item-1"
                collapsible
              >
                <AccordionItem
                  className="lg:border-y border-none py-2"
                  value="item-1"
                >
                  <AccordionTrigger className="py-3 flex justify-between">
                    Category
                    <Icon
                      type="chevronBottomIcon"
                      className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                    />
                  </AccordionTrigger>

                  {catData.data.map((item: any) => (
                    <AccordionContent className="">
                      <Accordion.Root className="" type="single" collapsible>
                        <AccordionItem className="" value="item-1">
                          <div
                            className={`rounded-lg flex justify-between py-1 items-center ${
                              checkedCat && checkedCat.item != null
                                ? checkedCat.item === item.name
                                  ? ""
                                  : ""
                                : ""
                            }`}
                          >
                            <button
                              className="flex space-x-3 rtl:space-x-reverse"
                              onClick={() => {
                                generatePath(slugify(item.name));
                              }}
                            >
                              <Checkbox
                                id="terms"
                                checked={
                                  checkedCat
                                    ? checkedCat.item === slugify(item.name)
                                      ? checkedCat.checkedState
                                      : false
                                    : false
                                }
                              />
                              <Typography size={"sm"}>{item.name}</Typography>
                            </button>

                            <AccordionTrigger className="">
                              <Icon
                                type="chevronBottomIcon"
                                sizes={"sm"}
                                className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                              />
                            </AccordionTrigger>
                          </div>

                          {item.children.map((child: any) => (
                            <AccordionContent className="">
                              <Accordion.Root
                                className=""
                                type="single"
                                collapsible
                              >
                                <AccordionItem className="" value="item-1">
                                  <div
                                    className={` rounded-lg flex justify-between p-1 ml-4 items-center ${
                                      checkedCat && checkedCat.item != null
                                        ? checkedCat.item === item.name ||
                                          checkedCat.item.includes(child.name)
                                          ? ""
                                          : ""
                                        : ""
                                    }`}
                                  >
                                    <button
                                      className="flex space-x-3 rtl:space-x-reverse"
                                      onClick={() => {
                                        generatePath(child.slug);
                                      }}
                                    >
                                      <Checkbox
                                        id="terms"
                                        checked={
                                          checkedCat
                                            ? checkedCat.item ===
                                              slugify(item.name)
                                              ? checkedCat.checkedState
                                              : checkedCat.item === child.slug
                                              ? checkedCat.checkedState
                                              : false
                                            : false
                                        }
                                      />
                                      <Typography size={"sm"}>
                                        {child.name}
                                      </Typography>
                                    </button>
                                    <AccordionTrigger className="">
                                      <Icon
                                        type="chevronBottomIcon"
                                        sizes={"sm"}
                                        className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                                      />
                                    </AccordionTrigger>
                                  </div>

                                  {child.sections.map((sec_data: any) => (
                                    <AccordionContent className="ml-7">
                                      <div
                                        className={` rounded-lg flex rtl:space-x-reverse space-x-4 p-1 ml-4 items-center ${
                                          checkedCat && checkedCat.item != null
                                            ? checkedCat.item === item.name ||
                                              checkedCat.item.includes(
                                                child.slug
                                              ) ||
                                              checkedCat.item.includes(
                                                sec_data.name
                                              )
                                              ? ""
                                              : ""
                                            : ""
                                        }`}
                                      >
                                        <button className="flex rtl:space-x-reverse space-x-3">
                                          <Checkbox
                                            id="terms"
                                            checked={
                                              checkedCat
                                                ? checkedCat.item ===
                                                  slugify(sec_data.name)
                                                  ? checkedCat.checkedState
                                                  : checkedCat.item ===
                                                    child.slug
                                                  ? checkedCat.checkedState
                                                  : checkedCat.item ===
                                                    slugify(item.name)
                                                  ? checkedCat.checkedState
                                                  : false
                                                : false
                                            }
                                            onClick={() => {
                                              generatePath(
                                                slugify(sec_data.name)
                                              );
                                            }}
                                          />
                                          <Typography
                                            lineClamp={"one"}
                                            size={"sm"}
                                          >
                                            {" "}
                                            {sec_data.name}
                                          </Typography>
                                        </button>
                                      </div>
                                    </AccordionContent>
                                  ))}
                                </AccordionItem>
                              </Accordion.Root>
                            </AccordionContent>
                          ))}
                        </AccordionItem>
                      </Accordion.Root>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion.Root>
              {brandsData ? (
                <Accordion.Root
                  className=""
                  type="single"
                  defaultValue="item-1"
                  collapsible
                >
                  <AccordionItem className="border-b py-2" value="item-1">
                    <AccordionTrigger className="py-3 flex justify-between">
                      Brands
                      <Icon
                        type="chevronBottomIcon"
                        className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                      />
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="h-[10rem] overflow-y-auto ">
                        {brandsData.map((brand: any) =>
                          brand.featured === true ? (
                            <button
                              onClick={() => {
                                debugger;

                                brandsArray.includes(slugify(brand.name))
                                  ? removeBrand(slugify(brand.name))
                                  : addBrand(slugify(brand.name));
                              }}
                              className="flex space-x-3 mb-3 rtl:space-x-reverse"
                            >
                              <Checkbox
                                checked={brandsArray.includes(
                                  slugify(brand.name)
                                )}
                              />
                              <div
                                className={cn(
                                  typographyVariants({
                                    size: "sm",
                                    variant: "paragraph",
                                  }),
                                  "cursor-pointer"
                                )}
                              >
                                {brand.name}
                              </div>
                            </button>
                          ) : null
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion.Root>
              ) : null}
            </>
          ) : null}

          <Accordion.Root
            className=""
            type="single"
            defaultValue="item-1"
            collapsible
          >
            <AccordionItem className="border-b py-2" value="item-1">
              <AccordionTrigger className="py-2 flex justify-between">
                Price
                <Icon
                  type="chevronBottomIcon"
                  className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                />
              </AccordionTrigger>

              <AccordionContent>
                <Slider
                  onValueChange={rangeSliderValueChange}
                  value={[rangeSliderValue[0], rangeSliderValue[1]]}
                  max={9999}
                  step={100}
                  className={cn("w-full py-4 mb-2")}
                />
                <div className="flex justify-between mb-1">
                  <div>Min Price</div>
                  <div>Max Price</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <Input
                      className="!rounded-none  font-semibold"
                      onChange={(e) =>
                        rangeSliderValueChange([
                          Number(
                            e.target.value.replace(
                              `${currentCountryDetails.currency}`,
                              ""
                            )
                          ),
                          rangeSliderValue[1],
                        ])
                      }
                      sizes={"sm"}
                      value={`${currentCountryDetails.currency} ${rangeSliderValue[0]}`}
                    />
                  </div>
                  <Icon type="minusIcon" className="mx-4" />
                  <div>
                    <Input
                      className="!rounded-none  font-semibold"
                      onChange={(e) =>
                        rangeSliderValueChange([
                          rangeSliderValue[0],
                          Number(
                            e.target.value.replace(
                              `${currentCountryDetails.currency}`,
                              ""
                            )
                          ),
                        ])
                      }
                      sizes={"sm"}
                      value={`${currentCountryDetails.currency} ${rangeSliderValue[1]}`}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    router.push(
                      {
                        query: {
                          ...router.query,
                          min_price: rangeSliderValue[0].toFixed(2),
                          max_price: rangeSliderValue[1].toFixed(2),
                        },
                      },
                      undefined,
                      { shallow: true }
                    );

                    // filterSet("min_price", rangeSliderValue[0].toFixed(2));
                  }}
                  rounded={"none"}
                  className="w-full !text-sm mt-3"
                >
                  FILTER
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion.Root>
        </div>
      </SideBarMenuTranstion>
      <div className="rounded-full md:hidden px-3 py-1.5 flex items-center z-50 space-x-4 fixed bottom-20 shadow-lg w-fit mx-auto left-0 right-0 bg-white">
        <button onClick={() => setSideBarState(true)}>
          <FilterIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setInstantChecked(!instantCheckedState);
            // filterSet("instant_only", 1);
          }}
          className="flex space-x-2 rtl:space-x-reverse items-center"
        >
          <Checkbox checked={instantCheckedState} />
          <Image
            src="https://www.lifepharmacy.com/images/instant.svg"
            width={50}
            height={50}
            alt="instant_image"
          />
        </button>
        <button>
          <UserPreferenceBtn />
        </button>
      </div>
    </>
  );
};

export { FiltersSection };
