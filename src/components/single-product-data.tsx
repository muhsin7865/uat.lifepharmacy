import React, { useState } from "react";
import Link from "next/dist/client/link";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { buttonVariants } from "./ui/button";
import {
  ProductBestSellerBadge,
  ProductOfferBadge,
  ProductRatingBadge,
  ProductWishList,
} from "./ui/badge";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";
import { AddOrEditCartBtn, ProductPricesData } from "./Button";
import { CategoriesSection } from "./feature-section";
import { useCartActions } from "@/hooks/useCartActions";

export const SingleProductData = ({
  pro_data,
  isRowView,
}: {
  pro_data: any;
  isRowView: boolean;
}) => {
// console.log(pro_data.availability_new[0].slot.time);

  const [isValidImage, setIsValidImage] = useState(true);
  const OfferType = (offer_type: string, offerValue: number) => {
    switch (offer_type) {
      case "flat_percentage_discount":
        return `FLAT ${offerValue}% OFF`;
      default:
        return "";
    }
  };
  const handleImageError = () => {
    setIsValidImage(false);
  };
  const { addWishList, removeWishList } = useCartActions();

  const wishListSet = (wishListState: boolean) => {
    debugger;
    !wishListState ? addWishList([pro_data]) : removeWishList(pro_data.id);
  };

  const offervalue = pro_data.offers ? pro_data.offers.value : null;
  return (
    <>
      {pro_data && !isRowView ? (
        <div className="border border-muted rounded-lg bg-white max-w-[200px] ">
          <figure className="border border-slate-100 m-2 rounded-lg relative">
            <Link
              href={`/product/${pro_data.slug}`}
              className="block  rounded-lg rounded-b-none"
            >
              {isValidImage ? (
                <Image
                  quality={70}
                  onError={handleImageError}
                  className={`rounded-lg  object-cover h-full w-full max-h-[200px]`}
                  src={pro_data.images?.featured_image}
                  width={200}
                  height={200}
                  alt="product_img"
                />
              ) : (
                <Skeleton className="h-[200px] w-full" />
              )}
              <ProductOfferBadge offersData={pro_data.offers} />
            </Link>
            <ProductBestSellerBadge proLabelData={pro_data.label} />
            <ProductRatingBadge
              productRating={pro_data.rating}
              isProductPage={false}
            />
            <ProductWishList
            iconSize={"sm"}
              wishListSet={wishListSet}
              productId={pro_data.id}
            />
          </figure>

          <div className=" px-2 py-1 rounded-lg rounded-t-none ">
            <ProductPricesData
              productPriceSize={"lg"}
              productPrices={pro_data.prices}
            />

            <Link href={`product/${pro_data.slug}`} className="h-5 block mt-1">
              <Typography variant={"lifeText"} size={"sm"} lineClamp={"two"}>
                {pro_data.title}
              </Typography>
            </Link>
            <div className="pt-1.5">
              <CategoriesSection categoriesData={pro_data.categories} />
              <div className="flex justify-between mt-3 items-center">
                <div className="flex  items-center">
                  <Image
                    src={`https://www.lifepharmacy.com/images/${pro_data.availability_new[0] ? pro_data.availability_new[0].slot.shipment_label : "standard"}-nr.svg`}
                    alt="delivery-img"
                    width={25}
                    height={25}
                  />
                  <Typography
                    variant={"lifeText"}
                    size={"xs"}
                    className="mx-2"
                    lineClamp={"one"}
                  >
                    {/* 30 MINS */}
                    {pro_data.availability_new[0] && pro_data.availability_new[0].slot.time || "1 - 2 DAYS"}
                  </Typography>
                </div>
                <AddOrEditCartBtn
                  proId={pro_data.id}
                  isSingleProductPage={false}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {pro_data && isRowView ? (
        <div className="rounded-lg border border-slate-200 my-1 relative bg-white shadow-sm">
          <Link
            href={`/product/${pro_data.slug}`}
            className="grid grid-cols-12 p-3 gap-x-3"
          >
            <div className=" relative md:col-span-2 col-span-4 h-fit my-auto">
              <Image
                src={pro_data.images.featured_image}
                height={150}
                width={150}
                className=" border border-slate-200 rounded-lg w-full my-auto"
                alt="pro_Image"
              />
              <ProductRatingBadge
                isProductPage={false}
                productRating={pro_data.rating}
              />
            </div>
            <div className="rounded-lg flex-col flex-grow justify-between flex md:col-span-9 col-span-8  space-y-2">
              <Typography
                variant={"lifeText"}
                bold={"semibold"}
                lineClamp={"two"}
              >
                {pro_data.title}
              </Typography>

              <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {pro_data.categories
                  ? pro_data.categories.map((cat: any) => (
                      <Link
                        href={`/products?categories=${cat.slug}`}
                        className={cn(
                          buttonVariants({
                            variant: "categoryBtn",
                            size: "xs",
                          }),
                          "mr-2"
                        )}
                      >
                        {cat.name}
                      </Link>
                    ))
                  : null}
              </div>
              {offervalue ? (
                <div className="bg-amber-200 w-fit text-xs py-1 px-2 h-fit   rounded">
                  {OfferType(pro_data.offers.type, pro_data.offers.value)}
                </div>
              ) : null}

              <ProductPricesData
                productPriceSize={"lg"}
                productPrices={pro_data.prices}
              />
            </div>
          </Link>

          <ProductBestSellerBadge proLabelData={pro_data.label} />

          <div className="absolute bottom-2 ltr:right-2 rtl:left-2   flex h-7 ">
            <AddOrEditCartBtn proId={pro_data.id} isSingleProductPage={false} />
          </div>
        </div>
      ) : null}
    </>
  );
};
