import { useLanguage } from "@/hooks/useLanguage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CommandDemo } from "./cmd-cart";
import { Typography } from "./ui/typography";
import { Icon } from "./ui/icons";
import { useRouter } from "next/router";
import { CartBadge } from "./ui/badge";
import { SelectedFlagCountry } from "./Button";

const LgScreenSubMenu = ({
  setSheetOpen,
  setLanguageModal,
}: {
  setSheetOpen: any;
  setLanguageModal: any;
}) => {
  const { t } = useLanguage();
  const [domLoaded, setDomLoaded] = useState(false);
  const { data: session } = useSession();
  const cartItems = useSelector((state: RootState) => state.cart);

  const wishListItems = cartItems.wishlist.data;
  const cartItemsData =
    cartItems.cart.shipment_data && cartItems.cart.shipment_data[0]
      ? cartItems.cart.shipment_data[0].products
      : [];
  const subTotal = cartItems?.cart?.cart_summary?.sub_total;
  const router = useRouter();
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const redirect = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className=" flex justify-between my-auto items-center h-12 w-fit text-white ">
      <SelectedFlagCountry setLanguageModal={setLanguageModal} />

      <button
        onClick={() => {
          session ? redirect("/dashboard") : setSheetOpen(true);
        }}
        className="flex flex-col justify-between pl-5 items-center"
      >
        <Icon type="accountIcon" className="mb-1 !w-6 !h-7" sizes={"lg"} />
        <Typography bold={"light"} size={"xs"}>
          {t.navbar.account}
        </Typography>
      </button>

      <button
        onClick={() => redirect("/wishlist")}
        className="flex flex-col justify-between pl-5 items-center relative"
      >
        <Icon type="heartIcon" className="mb-1 !w-6 !h-7" sizes={"lg"} />
        <Typography bold={"light"} size={"xs"} whitespace={"nowrap"}>
          {t.navbar.wishlist}
        </Typography>

        {domLoaded && wishListItems && wishListItems.length > 0 ? (
          <CartBadge message={wishListItems.length} />
        ) : null}
      </button>

      <button className="relative flex flex-col justify-between pl-5 items-center group/cart">
        <Icon
          onClick={() => redirect("/cart")}
          type="cartMenuIcon"
          className="mb-1 !w-6 !h-7"
        />
        {domLoaded && cartItemsData && cartItemsData.length > 0 ? (
          <CartBadge message={cartItemsData.length} />
        ) : null}
        <Typography bold={"light"} size={"xs"}>
          {t.navbar.cart}
        </Typography>

        {domLoaded && cartItemsData && cartItemsData.length > 0 ? (
          <div className="group-hover/cart:scale-100 bg-white  scale-0 absolute w-[25rem] top-[3rem] ltr:right-0 rtl:left-0   p-3   h-fit  shadow-lg z-30">
            <CommandDemo cartItems={cartItemsData} subTotal={subTotal} />
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default LgScreenSubMenu;
