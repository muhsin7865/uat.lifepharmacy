import { RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { ProductBestSellerBadge } from "./ui/badge";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";
import { AddOrEditCartBtn, ProductPricesData } from "./Button";
const SingleCartItem = ({ item }: { item: any }) => {
  const cartItems = useSelector((state: RootState) => state.cart);


  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const [proQty, setProQty] = useState<any>(0);
  const offervalue = item.offers ? item.offers.value : null;

  const getProductQuantity = (productId: any) => {
    const productItem = cartItemsData?.find((item: any) =>
      item.items[0].id === productId ? item.items[0].qty : null
    );
    return productItem ? productItem.items[0].qty : 0;
  };
  const itemExists = () => {
    return cartItemsData?.some(
      (itemData: any) => itemData.items[0].id === item.id
    );
  };


  const OfferType = (offer_type: string, offerValue: number) => {
    switch (offer_type) {
      case "flat_percentage_discount":
        return `FLAT ${offerValue}% OFF`;
      default:
        return "";
    }
  };

  useEffect(() => {
    setProQty(getProductQuantity(item.id));
  }, []);


  return proQty > 0 && itemExists() ? (
    <div className="rounded-lg border border-slate-200 mb-2 relative bg-white shadow-sm p-2">
      <Link
        href={`/product/${item.slug}`}
        className="flex space-x-3 rtl:space-x-reverse"
      >
        <div className=" relative   h-fit my-auto">
          <Image
            src={
              item.featured_image
                ? item.featured_image
                : "/images/default-product-image.png"
            }
            height={80}
            width={80}
            className=" border border-slate-200 rounded-lg my-auto max-w-[100px] max-h-[100px]"
            alt="pro_Image"
          />
          {/* <ProductRatingBadge productRating={item.rating} /> */}
        </div>
        <div className="rounded-lg flex-col flex-grow justify-between flex md:col-span-9 col-span-8  space-y-1">
          <Typography variant={"lifeText"} bold={"semibold"} lineClamp={"two"} size={"sm"} >
            {item.title}
          </Typography>
          {item.offers ? (
            <div className="bg-amber-200 w-fit text-[10px] py-0.5 px-2  rounded">
              {OfferType(item.offers.type, item.offers.value)}
            </div>
          ) : null}

          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {item.categories
              ? item.categories.map((cat: any) => (
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


          <ProductPricesData productPriceSize={"lg"} productPrices={item.prices} />
        </div>
      </Link>

      <ProductBestSellerBadge proLabelData={item.label} />

      <div className="absolute bottom-2 right-2 rtl:left-2 flex h-7 ">
        <AddOrEditCartBtn
          isSingleProductPage={false}
          proId={item.id}
        />
      </div>
    </div>
  ) : null;

};

export default SingleCartItem;
