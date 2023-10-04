import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import {
  AlertOctagon,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Edit3Icon,
  Heart,
  Info,
  LayoutGrid,
  Loader2,
  Mail,
  MapPinIcon,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  SunDim,
  Tag,
  Trash2,
  TrendingUp,
  Undo2,
  User2,
  X,
} from "lucide-react";
import React from "react";

const iconVariants = cva("block", {
  variants: {
    variant: {
      default: "",
      inputIconRight: "rtl:mr-2 ltr:ml-2 my-auto pointer-events-none",
      inputIconLeft: "rtl:ml-2  ltr:mr-2 my-auto pointer-events-none",
      loading:
        "animate-spin absolute right-2 inset-y-0  ml-2 flex my-auto pointer-events-none",
    },
    sizes: {
      default: "sm:w-6 sm:h-6 w-4 h-4",
      sm: "sm:w-4 sm:h-4 w-3 h-3",
      lg: "sm:w-8 sm:h-8 w-6 h-6",
      xs: "w-3 h-3",
      xl: "w-28 h-28 mx-auto",
    },
    animation: {
      spin: "animate-spin",
    },
  },
  defaultVariants: {
    sizes: "default",
    variant: "default",
  },
});

export interface IconProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  type?:
    | "crossIcon"
    | "searchIcon"
    | "refreshIcon"
    | "plusIcon"
    | "trashIcon"
    | "addToCartIcon"
    | "minusIcon"
    | "starIcon"
    | "loadingIcon"
    | "chatIcon"
    | "accountIcon"
    | "cartMenuIcon"
    | "heartIcon"
    | "locationPinIcon"
    | "hamburgerMenuIcon"
    | "chevronBottomIcon"
    | "chevronRightIcon"
    | "chevronLeftIcon"
    | "brandsIcon"
    | "mailIcon"
    | "errorIcon"
    | "checkIcon"
    | "cartIconMenu"
    | "categoryMenuIcon"
    | "homeIconMenu"
    | "ordersIcon"
    | "returnOrdersIcon"
    | "prescriptionIcon"
    | "LogoutIcon"
    | "chatWithUsIcon"
    | "wishlistIcon"
    | "appointmentsIcon"
    | "walletIcon"
    | "accountDetailsIcon"
    | "addressesIcon"
    | "editIcon"
    | "infoIcon"
    | "giftsIcon"
    | "returnsIcon"
    | "callIcon"
    | "listicon"
    | "secureIcon"
    | "gridIcon"
    | "rightArrowIcon"
    | "rightTopIcon"
    | "offersIcon"
    | "trendingIcon";
  iconIsLoading?: boolean;
}

const Icon: React.FC<IconProps> = (
  { type, sizes, className, variant, animation, iconIsLoading, ...props },
  ref
) => {
  return (
    <Icons
      type={iconIsLoading ? "refreshIcon" : type}
      {...props}
      className={cn(
        iconVariants({ sizes, className, variant, animation }),
        iconIsLoading ? "animate-spin" : ""
      )}
      ref={ref}
    />
  );
};

export { Icon };

const Icons: React.FC<IconProps> = ({ type, iconIsLoading, ref, ...props }) => {
  switch (type) {
    case "crossIcon":
      return <X {...props}></X>;
    case "searchIcon":
      return <Search {...props} />;
    case "loadingIcon":
      return <Loader2 {...props} />;
    case "rightArrowIcon":
      return <ArrowRight {...props} />;
    case "rightTopIcon":
      return <ArrowUpRight {...props} />;
    case "editIcon":
      return <Edit3Icon {...props} />;
    case "listicon":
      return <ClipboardList {...props} />;
    case "ordersIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          {...props}
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
          <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
          <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z" />
        </svg>
      );
    case "giftsIcon":
      return (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          {...props}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M160 894c0 17.7 14.3 32 32 32h286V550H160v344zm386 32h286c17.7 0 32-14.3 32-32V550H546v376zm334-616H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v140h366V310h68v172h366V342c0-17.7-14.3-32-32-32zm-402-4h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70v70zm138 0h-70v-70c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70z"></path>
        </svg>
      );
    case "returnsIcon":
      return <Undo2 {...props} />;
    case "gridIcon":
      return <LayoutGrid {...props} />;
    case "secureIcon":
      return <ShieldCheck {...props} />;
    case "callIcon":
      return <Phone {...props} />;
    case "chatIcon":
      return <MessageCircle {...props} />;
    case "returnOrdersIcon":
      return <Undo2 {...props} />;

    case "accountIcon":
      return <User2 {...props} />;

    case "cartMenuIcon":
      return <ShoppingCart {...props} />;

    case "prescriptionIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          {...props}
        >
          <path d="M8 5a.5.5 0 0 1 .5.5V7H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V8H6a.5.5 0 0 1 0-1h1.5V5.5A.5.5 0 0 1 8 5zm-2.5 6.5A.5.5 0 0 1 6 11h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
        </svg>
      );
    case "heartIcon":
      return <Heart {...props} />;

    case "locationPinIcon":
      return <MapPinIcon {...props} />;

    case "hamburgerMenuIcon":
      return <Menu  {...props} />;

    case "chevronBottomIcon":
      return <ChevronDown {...props} />;

    case "infoIcon":
      return <Info {...props} />;

    case "chevronRightIcon":
      return <ChevronRight {...props} />;

    case "chevronLeftIcon":
    case "chevronBottomIcon":
      return <ChevronLeft {...props} />;
    case "brandsIcon":
      return <SunDim {...props} />;
    case "offersIcon":
      return <Tag {...props} />;
    case "starIcon":
      return <Star {...props} />;
    case "minusIcon":
      return <Minus {...props} />;
    case "plusIcon":
      return <Plus {...props} />;
    case "trashIcon":
      return <Trash2 {...props} />;
    case "addToCartIcon":
      return (
        <svg
          {...props}
          fill="white"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M 4 7 C 3.449219 7 3 7.449219 3 8 C 3 8.550781 3.449219 9 4 9 L 6.21875 9 L 8.84375 19.5 C 9.066406 20.390625 9.863281 21 10.78125 21 L 23.25 21 C 24.152344 21 24.917969 20.402344 25.15625 19.53125 L 27.75 10 L 25.65625 10 L 23.25 19 L 10.78125 19 L 8.15625 8.5 C 7.933594 7.609375 7.136719 7 6.21875 7 Z M 22 21 C 20.355469 21 19 22.355469 19 24 C 19 25.644531 20.355469 27 22 27 C 23.644531 27 25 25.644531 25 24 C 25 22.355469 23.644531 21 22 21 Z M 13 21 C 11.355469 21 10 22.355469 10 24 C 10 25.644531 11.355469 27 13 27 C 14.644531 27 16 25.644531 16 24 C 16 22.355469 14.644531 21 13 21 Z M 16 7 L 16 10 L 13 10 L 13 12 L 16 12 L 16 15 L 18 15 L 18 12 L 21 12 L 21 10 L 18 10 L 18 7 Z M 13 23 C 13.5625 23 14 23.4375 14 24 C 14 24.5625 13.5625 25 13 25 C 12.4375 25 12 24.5625 12 24 C 12 23.4375 12.4375 23 13 23 Z M 22 23 C 22.5625 23 23 23.4375 23 24 C 23 24.5625 22.5625 25 22 25 C 21.4375 25 21 24.5625 21 24 C 21 23.4375 21.4375 23 22 23 Z"></path>
          </g>
        </svg>
      );
    case "refreshIcon":
      return <RefreshCcw {...props} />;

    case "mailIcon":
      return <Mail {...props} />;

    case "errorIcon":
      return <AlertOctagon {...props} />;
    case "checkIcon":
      return <CheckCircle2 {...props} />;
    case "cartIconMenu":
      return <ShoppingCart {...props} />;

    case "homeIconMenu":
      return (
        <svg
          stroke="currentColor"
          fill="currentColor"
          {...props}
          stroke-width="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"></path>
        </svg>
      );
    case "addressesIcon":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      );
    case "accountDetailsIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 "
          viewBox="0 0 16 16"
          {...props}
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      );
    case "walletIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 "
          viewBox="0 0 16 16"
          {...props}
        >
          <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
        </svg>
      );
    case "appointmentsIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 "
          viewBox="0 0 16 16"
          {...props}
        >
          <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
        </svg>
      );
    case "wishlistIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 "
          viewBox="0 0 16 16"
          {...props}
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      );
    case "chatWithUsIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 "
          viewBox="0 0 16 16"
          {...props}
        >
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
        </svg>
      );
    case "LogoutIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 "
          viewBox="0 0 16 16"
          {...props}
        >
          <path d="M7.5 1v7h1V1h-1z" />
          <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
        </svg>
      );
    case "trendingIcon":
      return <TrendingUp {...props} />;
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          {...props}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
  }
};

export { Icons, iconVariants };
