import { useRouter } from "next/router";
import { Typography } from "./ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdownMenu";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { useState } from "react";

import { UserPreferenceBtn } from "./Button";

const ProductFilters = ({
  productsLength,
  noOfProductsCurrently,
}: {
  productsLength: any;
  noOfProductsCurrently: any;
}) => {
  const filters = [
    { name: "popularity", text: "Most Popular" },
    { name: "most-rated", text: "Most Rated" },
    { name: "price-asc", text: "Price: Low to High" },
    { name: "price-desc", text: "Price: High to Low" },
  ];
  const router = useRouter();
  const [selectedFilter, setFilter] = useState(filters[0]);

  const { pathname } = useRouter();

  return !pathname.includes("search") ? (
    <div className="flex justify-between py-3">
      <div className="h-fit my-auto">
        <Typography size={"sm"}>
          Showing <span className="text-black">{noOfProductsCurrently}</span> of{" "}
          <span className="text-black ">{productsLength}</span> Products
        </Typography>
      </div>
      <div className=" items-center md:flex hidden">
        <div className="relative inline-block text-left group/sort-menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"normal"} className="py-2">
                <span className="mx-2"> {selectedFilter.text}</span>
                <Icon type="chevronBottomIcon" sizes={"sm"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount>
              {filters.map((filter: any, indx: number) => (
                <DropdownMenuItem
                  onClick={() => {
                    router.push(
                      {
                        query: {
                          ...router.query,
                          order_by: filters[indx].name,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                    setFilter(filter);
                  }}
                >
                  <span>{filter.text}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mx-5">
          <UserPreferenceBtn />
        </div>
      </div>
    </div>
  ) : null;
};

export { ProductFilters };
