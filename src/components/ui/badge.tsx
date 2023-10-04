import Image from "next/image";
import { Icon, IconProps, iconVariants } from "./icons";
import { Typography } from "./typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const CartBadge = ({ message }: { message: string | number }) => {
  return (
    <div className="bg-primary   absolute -right-2 rounded-full -top-2 h-5 w-5 leading-5">
      <Typography size={"xs"} type="span" alignment={"horizontalCenter"}>
        {message}
      </Typography>
    </div>
  );
};

const ProductRatingBadge = ({
  productRating,
  isProductPage,
}: {
  productRating: number;
  isProductPage: boolean;
}) => {
  const reviewColor = (rating: number) => {
    if (rating == 0) {
      return "bg-slate-200";
    } else {
      return "bg-amber-300";
    }
  };

  return (
    <>
      <span
        className={`flex ${
          isProductPage ? "w-fit my-1" : " absolute bottom-0.5 left-0.5"
        } space-x-1 rtl:space-x-reverse opacity-90 px-[7px]   rounded-full shadow-xl text-white items-center ${reviewColor(
          productRating
        )}`}
      >
        <Icon sizes={"xs"} type="starIcon" className="fill-white my-auto" />

        <Typography size={"sm"}>{productRating}</Typography>
      </span>
    </>
  );
};

const ProductWishList = ({
  iconSize,
  wishListSet,
  productId,
}: {
  iconSize?: IconProps["sizes"];
  wishListSet: (state: boolean) => void;
  productId: any;
}) => {
  const [wishlistState, setWishListState] = useState(false);
  const [wishListAnimationstate, setWishListAnimation] = useState(false);
  const wishlistItems = useSelector(
    (state: RootState) => state.cart.wishlist.data
  );
  const itemWishListState = () => {
    return wishlistItems.find((item: any) => item.id === productId);
  };

  useEffect(() => {
    setWishListState(itemWishListState());
  }, [wishListAnimationstate]);

  const wishListOnCLick = () => {
    debugger;
    wishListSet(wishlistState);
    setWishListState(!wishlistState);
    if (!wishlistState) {
      setWishListAnimation(true);

      setTimeout(() => {
        setWishListAnimation(false);
      }, 500);
    }
  };
  return (
    <>
      <span
        className="absolute right-2 bottom-2 bg-white/70 backdrop-blur-sm p-1 rounded-full cursor-pointer z-[5] shadow-md"
        onClick={() => {
          wishListOnCLick();
        }}
      >
        <Icon
          sizes={iconSize}
          type="heartIcon"
          
          className={
            wishlistState ? "fill-pink-600 text-pink-600" : "text-slate-600"
          }
        />
      </span>
      {wishListAnimationstate ? (
        <div className="absolute left-0 flex justify-center items-center right-0 top-0 bottom-0 z-[9]">
          <Icon
            type="heartIcon"
            sizes={"lg"}
            className="my-auto fill-pink-500 text-pink-500 animate-ping repeat-1 duration-800"
          />
        </div>
      ) : null}
    </>
  );
};

const ProductOfferBadge = ({ offersData }: { offersData: any }) => {
  return offersData ? (
    <div className="absolute left-2 top-2 bg-red-500 rounded-full text-white text-sm p-[5px] shadow-lg text-center overflow-hidden leading-3 label-circle w-[3rem] h-[3rem]">
      {offersData.value ? (
        <>{parseFloat(offersData.value).toFixed(0)} % OFF</>
      ) : (
        <>BUY1 GET1</>
      )}
    </div>
  ) : null;
};

const ProductBestSellerBadge = ({ proLabelData }: { proLabelData: any }) => {
  const generateIcon = (type: string) => {
    return (
      <Image
        src={`https://www.lifepharmacy.com/images/label/${type}.svg`}
        height={30}
        width={30}
        alt="icon"
        className={iconVariants({ sizes: "sm" })}
      />
    );
  };
  return proLabelData ? (
    <div
      style={{ background: proLabelData.color_code }}
      className={`skeleton-box ribbon-2  flex items-center text-white z-[5]`}
    >
      {" "}
      <Typography size={"sm"} lineClamp={"one"}>
        {proLabelData.label_text}
      </Typography>
      <div className={`ml-2`}>{generateIcon(proLabelData.icon_type)}</div>
    </div>
  ) : null;
};

const SelectLangBadge = ({ selectLang }: { selectLang: string }) => {
  return (
    <div className="bg-emerald-500  text-white xs:flex hidden rounded-full md:px-2  items-center space-x-2 rtl:space-x-reverse px-2  ">
      <span className=" text-[10px] leading-4">{selectLang}</span>
    </div>
  );
};

export {
  CartBadge,
  ProductRatingBadge,
  ProductOfferBadge,
  ProductBestSellerBadge,
  SelectLangBadge,
  ProductWishList,
};
