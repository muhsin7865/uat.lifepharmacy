import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/hooks/useLanguage";
import { Typography, typographyVariants } from "./ui/typography";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useModal } from "./ui/modalcontext";
import { Icon } from "./ui/icons";
const LgNavbarBottom = ({
  locationOnClickHandle,
}: {
  locationOnClickHandle: any;
}) => {
  const { t } = useLanguage();
  const { AddressDataIndex, addressData } = useModal();
  const displayAddress = () => {
    if (addressData && addressData.length > 0) {
      return AddressDataIndex?.google_address;
    } else {
      return "Dubai, United Arab Emirates";
    }
  };

  return (
    <>
      <div className="bg-life-2 items-center py-[1px]">
        <div className="  justify-between py-0.5 container-page text-white flex">
          <Link
            href={"/super-summer-savers"}
            className={cn(
              "flex justify-start items-center",
              typographyVariants({ variant: "secondary" })
            )}
          >
            <Typography size={"sm"} lineClamp={"one"} bold={"light"}>
              {t.navbar.highest_rated_phar}
            </Typography>
            <span className=" mx-2">|</span>
            <Image
              src={"https://www.lifepharmacy.com/images/app-rating.svg"}
              className="w-20 h-5 my-auto"
              height={30}
              width={30}
              alt={"app-rating"}
            />
            <span className="mx-2">|</span>
            <Typography size={"sm"} lineClamp={"one"} bold={"light"}>
              Download Now
            </Typography>
          </Link>
          <div className="flex items-center ">
            <Typography
              lineClamp={"one"}
              size={"xs"}
              bold={"light"}
              className="max-w-[30rem] mx-2"
            >
              <span className="font-semibold">{t.navbar.deliver_to}:</span>  {displayAddress()}{" "}
            </Typography>
            <Button
              onClick={() => {
                locationOnClickHandle();
              }}
              iconLeft={
                <Icon
                  sizes={"xs"}
                  type="locationPinIcon"
                  className="ltr:mr-1 rtl:ml-1 !w-[10px]"
                />
              }
              iconType="locationPinIcon"
              variant="white"
              size={"xs"}
              rounded={"sm"}
            >
              <div className=" leading-normal">CHANGE</div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LgNavbarBottom;
