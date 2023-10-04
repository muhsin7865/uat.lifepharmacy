import { useCartActions } from "@/hooks/useCartActions";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, buttonVariants } from "./ui/button";
import { Icon, Icons } from "./ui/icons";
import { Typography, TypographyProps } from "./ui/typography";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { useModal } from "./ui/modalcontext";
import getFrequentlyBroughtTogetherData from "@/lib/frequentlyBroughtTogether";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

// export const BrandsButton = ({ brandName ,removeBrand, addBrand, brandsArray }: { brandName: any, brandsArray:any,  removeBrand:any, addBrand:any }) => {
//   const [isInverted, setIsInverted] = useState(false);

//   function slugify(text: any) {
//     if (text) {
//       return text.toLowerCase().replace(/[\/\s&]+/g, "-");
//     } else {
//       return "";
//     }
//   }

//   return (
//     <button
//       onClick={() => {
//         debugger;
//         setIsInverted((prevState) => !prevState);
//         isInverted
//           ? removeBrand(slugify(brandName))
//           : addBrand(slugify(brandName));
//       }}
//       className="flex space-x-3 mb-3 rtl:space-x-reverse"
//     >
//       <Checkbox checked={isInverted} />
//       <div
//         className={cn(
//           typographyVariants({ size: "sm", variant: "paragraph" }),
//           "cursor-pointer"
//         )}
//       >
//         {brandName}
//       </div>
//     </button>
//   );
// };

export const DeliverInstructionsBtn = ({ instr }: { instr: any }) => {
  const [instrSelected, setInstrSelected] = useState(false);
  return (
    <button
      onClick={() => setInstrSelected(!instrSelected)}
      className={`border  p-2 rounded-lg ${
        instrSelected ? " bg-blue-200" : "border-muted"
      }`}
    >
      <Image
        src={instrSelected ? instr.icon_selected : instr.icon_unselected}
        height={50}
        width={50}
        alt="del-ins"
        className="mx-auto"
      />
      <Typography size={"xs"}>{instr.instruction}</Typography>
    </button>
  );
};

export const AddOrEditCartBtn = ({
  proId,
  isSingleProductPage,
}: {
  proId: string;
  isSingleProductPage: boolean;
}) => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const { locale } = useLanguage();
  const [cartItemsAddTimeoutState, setCartItemsAddTimeout] =
    useState<any>(null);
  const [cartItemsUpdateTimeoutState, setCartItemsUpdateAddTimeout] =
    useState<any>(null);
  const [addBtnLoadingState, setAddBtnLoadingState] = useState<boolean>(false);
  const [loadingFinished, setLoadingFinished] = useState<boolean>(false);
  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const [addedToCartClicked, addedToCartState] = useState(false);

  const getProductQuantity = (productId: any) => {
    const productItem = cartItemsData?.find((item: any) =>
      item.items[0].id === productId ? item.items[0].qty : null
    );
    return productItem ? productItem.items[0].qty : 0;
  };
  const { setFrequentlyBroughtData } = useModal();
  const { createCart, updateCart } = useCartActions();
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const cartInit: any = {
    action: "",
    data: {
      items: [],
      address_id: null,
    },
  };

  const clearCartState = () => {
    cartInit.data.items = [];
    cartInit.action = "";
  };
  const getFrequentlyBroughtData = () => {
    getFrequentlyBroughtTogetherData(proId, locale).then((res) => {
      res.data.products !== null
        ? setFrequentlyBroughtData([
            { proData: res.data.products },
            { proId: proId },
          ])
        : setFrequentlyBroughtData(null);
    });
  };
  useEffect(() => {
    setProQty(getProductQuantity(proId));
  }, [cartItemsData]);

  const [proQty, setProQty] = useState<any>(0);

  const addedToCart = () => {
    setProQty(1);
    setLoadingState(true);
    addedToCartState(true);
    setAddBtnLoadingState(true);
    clearTimeout(cartItemsAddTimeoutState);
    getFrequentlyBroughtData();
    const timeout = setTimeout(() => {
      cartInit.data.items.push({ id: proId, qty: 1 });
      createCart(cartInit);
      setTimeout(() => {
        setLoadingState(false);
      }, 2500);
      setAddBtnLoadingState(false);
      setLoadingFinished(true);
      clearCartState();
    }, 800);

    setCartItemsAddTimeout(timeout);
  };

  // const itemExists = () => {
  //   debugger
  //   return cartItemsData?.some((item: any) => item.items[0].id === proId);
  // };

  const updateCartQuantity = (updatedQty: number) => {
    setProQty(updatedQty);
    getFrequentlyBroughtData();

    setLoadingState(true);
    addedToCartState(true);

    clearTimeout(cartItemsUpdateTimeoutState);

    const timeout = setTimeout(() => {
      cartInit.data.items.push({ id: proId, qty: updatedQty });
      updateCart(cartInit);
      setLoadingState(false);
      clearCartState();
    }, 1500);

    setCartItemsUpdateAddTimeout(timeout);
  };

  return proQty > 0 || loadingFinished || isSingleProductPage ? (
    <div className="flex items-center">
      <Button
        onClick={() => {
          proQty > 1 || !isSingleProductPage
            ? updateCartQuantity(proQty - 1)
            : null;
        }}
        variant={"ghost"}
        className={`!px-1  ${
          isSingleProductPage
            ? "sm:h-[35px] sm:w-[35px] h-[30px] w-[30px]"
            : "sm:h-[30px] sm:w-[30px] h-[25px] w-[25px]"
        }`}
      >
        <Icon type={proQty > 1 ? "minusIcon" : "trashIcon"} sizes={"sm"} />
      </Button>
      <Typography size={"sm"} className="sm:px-2 px-2 flex items-center">
        {isSingleProductPage && proQty === 0 ? 1 : proQty}
      </Typography>
      <Button
        disableBtn={loadingState}
        onClick={() => {
          updateCartQuantity(proQty + 1);
        }}
        className={`!px-1  ${
          isSingleProductPage
            ? "sm:h-[35px] sm:w-[35px] h-[30px] w-[30px]"
            : "sm:h-[30px] sm:w-[30px] h-[25px] w-[25px]"
        }`}
      >
        <Icon
          type={"plusIcon"}
          sizes={"sm"}
          variant={"default"}
          iconIsLoading={loadingState}
        />
      </Button>
    </div>
  ) : (
    <Button
      size={"sm"}
      iconLeft={
        addBtnLoadingState ? (
          <Icon
            type="refreshIcon"
            sizes={"sm"}
            className="ltr:mr-1 rtl:ml-1 animate-spin"
          />
        ) : (
          <Icon  type="addToCartIcon" className="ltr:mr-1 rtl:ml-1 !w-5 !h-5" />
        )
      }
      className="py-1 "
      onClick={() => {
        addedToCart();
      }}
    >
      <div className="leading-[0px]">
      ADD

      </div>
    </Button>
  );
};

export const ProductPricesData = ({
  productPrices,
  productPriceSize,
}: {
  productPrices: any;
  productPriceSize: TypographyProps["size"];
}) => {
  const { currentCountryDetails } = useLanguage();

  const offerPrice = productPrices && productPrices[0].price.offer_price;
  const regularPrice = productPrices && productPrices[0].price.regular_price;
  return (
    <div className="flex justify-between">
      {productPrices ? (
        offerPrice != regularPrice ? (
          <div className="flex space-x-2 rtl:space-x-reverse items-center">
            <Typography
              size={productPriceSize}
              variant={"danger"}
              whitespace={"nowrap"}
              className=""
            >
              {" "}
              <Typography size={"sm"} type="span">
                {currentCountryDetails.currency}
              </Typography>{" "}
              {offerPrice}
            </Typography>
            <Typography
              size={"sm"}
              bold={"bold"}
              variant={"primary"}
              whitespace={"nowrap"}
              className="line-through"
            >
              {" "}
              <Typography size={"xs"} type="span">
                {currentCountryDetails.currency}
              </Typography>{" "}
              {regularPrice}
            </Typography>
          </div>
        ) : (
          <Typography
            size={productPriceSize}
            variant={"primary"}
            whitespace={"nowrap"}
          >
            {" "}
            <Typography size={"sm"} type="span">
              {currentCountryDetails.currency}
            </Typography>{" "}
            {regularPrice}
          </Typography>
        )
      ) : null}
    </div>
  );
};

export const RadioBtnGroup = ({
  id,
  value,
  name,
}: {
  id: string;
  value: string;
  name: string;
}) => {
  return (
    <>
      <input type="radio" className="hidden peer" id={id} name={name} />
      <label
        htmlFor={id}
        className={cn(
          buttonVariants({ variant: "primaryRadioCheck", size: "sm" }),
          "mb-2 mr-2 !px-5 py-1.5"
        )}
      >
        {value}
      </label>
    </>
  );
};

export const SelectedFlagCountry = ({
  setLanguageModal,
}: {
  setLanguageModal: any;
}) => {
  const { selectedLanguageDetails, currentCountryDetails } = useLanguage();

  return (
    <button
      onClick={() => {
        setLanguageModal(true);
      }}
      className="flex flex-col justify-between md:pl-5 pl-0 "
    >
      <Image
        src={currentCountryDetails.flag}
        className="w-8 h-8 rounded-xl mx-auto"
        height={100}
        width={100}
        alt="selectedFlag"
      />
      <Typography size={"sm"}>
        {selectedLanguageDetails.name === "English" ? "العربية" : "English"}
      </Typography>
    </button>
  );
};

export const UserPreferenceBtn = () => {
  useEffect(() => {
    if (localStorage.getItem("user-preference-view-type") === "row") {
      setUsersPreference(userPreferences[1]);
    } else {
      setUsersPreference(userPreferences[0]);
    }
  }, []);
  const { setUsersPreference, selectedUserPrefernece } = useModal();
  const changeUserPreference = (pref: any) => {
    localStorage.setItem("user-preference-view-type", pref.value);
    setUsersPreference(pref);
  };

  const userPreferences = [
    { title: "Grid View", value: "grid", IconType: "gridIcon" },
    { title: "Row View", value: "row", IconType: "listicon" },
  ];

  return (
    selectedUserPrefernece && (
      <Tabs defaultValue={selectedUserPrefernece.value} className="border-none">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value={userPreferences[0].value}
            className="z-20"
            onClick={() => changeUserPreference(userPreferences[0])}
          >
            <Icons type="gridIcon" sizes={"sm"} className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger
            value={userPreferences[1].value}
            onClick={() => changeUserPreference(userPreferences[1])}
          >
            <Icons type="listicon" sizes={"sm"} className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
  );
};
