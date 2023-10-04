import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Typography, typographyVariants } from "./ui/typography";
import { Icon, iconVariants } from "./ui/icons";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CartBadge } from "./ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

const SmMenu = ({
  setSmScreenSearchBox,
  searchButtonOnClick,
  setSheetOpen,
  isSheetOpen,
}: {
  setSheetOpen: any;
  isSheetOpen: any;
  setSmScreenSearchBox: any;
  searchButtonOnClick: any;
}) => {
  const router = useRouter();
  const { asPath } = router;
  const { data: session } = useSession();
  const [domLoaded, setDomLoaded] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart);

  const cartItemsData =
    cartItems.cart.shipment_data && cartItems.cart.shipment_data[0]
      ? cartItems.cart.shipment_data[0].products
      : [];

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const menuItems = [
    {
      title: "Home",
      IconName: "home",
      onClick: () => {
        redirect("/");
      },
    },
    {
      title: "Category",
      IconName: "category",
      onClick: () => {
        redirect("/category-menu/beauty-care");
      },
    },
    {
      title: "Prescription",
      IconName: "prescription",
      onClick: () => {
        redirect("/prescription-upload");
      },
    },
    {
      title: "Profile",
      IconName: "profile",
      onClick: () => {
        session ? redirect("/dashboard") : setSheetOpen(true);
      },
    },
    {
      title: "Cart",
      IconName: "cart",
      onClick: () => {
        redirect("/cart");
      },
    },
  ];

  const redirect = (url: string) => {
    router.push(url);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white  border-t border-muted  py-2 pb-3 items-center z-30 min-w-[18rem]">
      <div className="flex justify-between sm:px-6 px-5">
        {menuItems.map((item) => (
          <button
            onClick={() => item.onClick()}
            className="relative flex flex-col"
          >
            <Image
              src={`https://www.lifepharmacy.com/images/svg/${item.IconName}${
                (item.IconName === "profile" &&
                  (isSheetOpen || asPath.includes("/dashboard"))) ||
                (item.IconName != "home" && asPath.includes(item.IconName)) ||
                (item.IconName === "home" && asPath === "/")
                  ? "-active"
                  : ""
              }.svg`}
              height={20}
              width={20}
              alt={item.IconName}
              className="mx-auto mb-0.5 max-w-[20px]"
            />

            <Typography
              size={"xs"}
              lineClamp={"one"}
              variant={"lifeText"}
              alignment={"horizontalCenter"}
            >
              {item.title}
            </Typography>
            {domLoaded && item.IconName === "cart" && (
              <CartBadge message={cartItemsData.length} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SmMenu;
