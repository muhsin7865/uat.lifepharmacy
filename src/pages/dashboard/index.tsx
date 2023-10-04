import { useEffect, useState } from "react";
import {
  SideBarMenuTranstion,
  TransitionComp,
} from "@/components/ui/transition";
import { signOut, useSession } from "next-auth/react";
import { useModal } from "@/components/ui/modalcontext";
import { Icon, IconProps } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import BreadCrumb from "@/components/breadcrumb";
import InvalidOTPModal from "@/components/invalid-otp-modal";
import {
  AccountDetailsComp,
  AddressComp,
  AppointmentsComp,
  DashboardComp,
  OrderComp,
  PrescriptionComp,
  ReturnOrdersComp,
  WalletComp,
} from "@/components/dashboard-components";
import { useRouter } from "next/router";
import { toast } from "@/components/ui/toast";
import Image from "next/image";

export default function DashboardPage({}) {
  const [logOutWarningModal, setLogOutWarningModal] = useState(false);
  const { data: session } = useSession();
  const [menuItemVisiblity, setMenuItemVisiblity] = useState("dashboard");
  const router = useRouter();
  const { setSheetOpen, setModalFixedState } = useModal();

  useEffect(() => {
    setModalFixedState(true);
    !session ? setSheetOpen(true) : setSheetOpen(false);
  }, [session]);

  type menuItems =
    | "dashboard"
    | "orders"
    | "returnOrders"
    | "prescrpition"
    | "addresses"
    | "accountDetails"
    | "wallet"
    | "appointments"
    | "wishlist"
    | "chatWithUs"
    | "Logout";

  const setActiveMenuItem = (menuItemName: menuItems) => {
    setMenuItemVisiblity(menuItemName);
  };

  interface menuItemProps {
    id: string;
    name: string;
    onClick: () => void;
    iconType: IconProps["type"];
    component?: React.ReactNode;
  }

  const menuItems: menuItemProps[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      onClick: () => {
        setActiveMenuItem("dashboard");
      },
      iconType: "homeIconMenu",
      component: <DashboardComp setActiveMenuItem={setActiveMenuItem} />,
    },
    {
      id: "orders",
      name: "Orders",
      onClick: () => {
        setMenuItemVisiblity("orders");
      },
      iconType: "ordersIcon",
      component: <OrderComp />,
    },
    {
      id: "returnOrders",
      name: "Return Orders",
      onClick: () => {
        setActiveMenuItem("returnOrders");
      },
      iconType: "returnOrdersIcon",
      component: <ReturnOrdersComp />,
    },
    {
      id: "prescrpition",
      name: "Prescrpition",
      onClick: () => {
        setActiveMenuItem("prescrpition");
      },
      iconType: "prescriptionIcon",
      component: <PrescriptionComp />,
    },
    {
      id: "addresses",
      name: "Addresses",
      onClick: () => {
        setActiveMenuItem("addresses");
      },
      iconType: "addressesIcon",
      component: <AddressComp />,
    },
    {
      id: "accountDetails",
      name: "Account Details",
      onClick: () => {
        setActiveMenuItem("accountDetails");
      },
      iconType: "accountDetailsIcon",
      component: <AccountDetailsComp />,
    },
    {
      id: "wallet",
      name: "Wallet",
      onClick: () => {
        setActiveMenuItem("wallet");
      },
      iconType: "walletIcon",
      component: <WalletComp />,
    },
    {
      id: "appointments",
      name: "Appointments",
      onClick: () => {
        setActiveMenuItem("appointments");
      },
      iconType: "appointmentsIcon",
      component: <AppointmentsComp />,
    },
    {
      id: "wishlist",
      name: "Wishlist",
      onClick: () => {
        router.push("/wishlist");
      },
      iconType: "wishlistIcon",
    },
    {
      id: "chatWithUs",
      name: "Chat With Us",
      onClick: () => {
        setActiveMenuItem("chatWithUs");
      },
      iconType: "chatWithUsIcon",
    },
    {
      id: "Logout",
      name: "Log Out",
      onClick: () => {
        setLogOutWarningModal(true);
      },
      iconType: "LogoutIcon",
    },
  ];
  const [sideBarShrink, setsidebarShrinked] = useState(false);

  return session && session.token ? (
    <div className="container-page !px-0 ">
      <BreadCrumb menuData={["My Account"]} type="" />
      <div className="bg-slate-100 w-full h-full p-1 flex justify-between border-b border-b-slate-200 md:hidden">
        <button
          onClick={() => setsidebarShrinked(!sideBarShrink)}
          className="  my-auto md:hidden items-center p-1  rounded-lg flex rtl:space-x-reverse space-x-2 "
        >
          <Icon type="hamburgerMenuIcon" className="w-5 h-5 text-slate-500" />
          <Typography size={"sm"}>Menu</Typography>
        </button>
      </div>

      <div className="container-page !px-0   flex  space-x-5 h-full w-full rtl:space-x-reverse ">
        <nav
          id="separator-sidebar"
          className="    fixed w-80 h-screen md:block hidden "
        >
          <SideBarMenuTranstion
            isOpen={sideBarShrink}
            setIsClosed={setsidebarShrinked}
          >
            <div className="px-6 bg-blue-300 py-4 ">
              <Image
                src="/images/user.png"
                width={"100"}
                height={"100"}
                alt="user"
                className="mx-auto"
              />
              <Typography
                bold={"semibold"}
                size={"lg"}
                className="mt-3"
                alignment={"horizontalCenter"}
              >
                {" "}
                {session && session.user ? session?.user.name : "User"}
              </Typography>
              <Typography
                size={"sm"}
                variant={"secondary"}
                alignment={"horizontalCenter"}
              >
                {session?.token.email}
              </Typography>
            </div>

            <ul className=" font-medium     overflow-y-auto h-full ">
              {menuItems.map((menuItem, indx) => (
                <li>
                  <button
                    onClick={() => {
                      menuItem.onClick();
                      setsidebarShrinked(false);
                    }}
                    className={`border-b border-x w-full p-3 relative pl-5 justify-start ${
                      menuItemVisiblity === menuItem.id
                        ? "text-black bg-slate-100 "
                        : "text-black"
                    }`}
                  >
                      {menuItemVisiblity === menuItem.id &&
                    <div className="bg-blue-500 h-2/3 my-auto w-[5px] absolute left-0 top-0 bottom-0 rounded-lg"></div>

                      }
                      <div className="flex space-x-1">
                      <Icon
                        type={menuItem.iconType}
                        className={`mr-3 text-slate-700 ${menuItemVisiblity === menuItem.id && "text-blue-500"}` }
                      />
                    <Typography
                      lineClamp={"one"}
                      variant={"lifeText"}
                      bold={"semibold"}
                      className={`${
                        menuItemVisiblity === menuItem.id ? "text-primary" : ""
                      }`}
                    >
                      {menuItem.name}
                    </Typography>
                      </div>
                  
                  </button>
                </li>
              ))}
            </ul>
          </SideBarMenuTranstion>
        </nav>
        <div className="w-80 flex-shrink-0 md:block hidden"></div>
        <div className="w-full px-3 py-5 ">
          {menuItems.map((menuItem) =>
            menuItemVisiblity === menuItem.id ? (
              <TransitionComp setTransition={menuItemVisiblity === menuItem.id}>
                {menuItem.component}
              </TransitionComp>
            ) : null
          )}
        </div>
      </div>
      <InvalidOTPModal
        isWarning={true}
        showModal={logOutWarningModal}
        setCloseModal={setLogOutWarningModal}
        modalMessage="Are you sure you want to log out?"
        modalHeader="Logout"
        buttonProps={
          <div className="flex space-x-2 w-full rtl:space-x-reverse">
            <Button
              className="mx-auto w-full"
              onClick={() => {
                signOut();
                toast({
                  title: "Success",
                  message: "Logout Successfull",
                  type: "success",
                });
                router.push("/");
              }}
            >
              OK
            </Button>
            <Button
              variant={"outline"}
              className="mx-auto w-full"
              onClick={() => {
                setLogOutWarningModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      />
    </div>
  ) : (
    <div className="h-[500px] w-full bg-white"></div>
  );
}
