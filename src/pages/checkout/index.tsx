import { DeliverInstructionsBtn } from "@/components/Button";
import InvalidOTPModal from "@/components/invalid-otp-modal";
import { PaymentMethodModal } from "@/components/location-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/ui/modalcontext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Typography, typographyVariants } from "@/components/ui/typography";
import { useCartActions } from "@/hooks/useCartActions";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout({}) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [paymentMethodModalState, setPaymentMethodModalState] = useState(false);
  const [newCardSelected, setNewCardSelectedState] = useState(false);
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const [couponCodeValue, setCouponCodeValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [invalidModalState, setInvalidModalState] = useState(false);
  const { data: session } = useSession();
  const { updateDeliverySlot, applyCoupon } = useCartActions();

  const {
    setSheetOpen,
    setModalFixedState,
    setaddNewAddress,
    AddressDataIndex,
    addressData,
  } = useModal();
  useEffect(() => {
    setModalFixedState(true);
    setDomLoaded(true);
    !session ? setSheetOpen(true) : setSheetOpen(false);
  }, [session]);

  const cartItems = useSelector((state: RootState) => state.cart);
  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const shipmentData = cartItems.cart.shipment_data
    ? cartItems.cart.shipment_data[0]
    : [];
  const cartSummery = cartItems.cart.cart_summary;
  console.log(shipmentData.available_slots);

  return domLoaded ? (
    <div className="grid grid-cols-12 gap-x-3 px-[10px] py-5 max-w-[1440px] mx-auto">
      <div className="space-y-3 md:col-span-8 col-span-full">
        <div className="shadow-md rounded-lg p-2 border-2 border-muted">
          <div className="bg-blue-400 text-white flex justify-between rounded-full px-3 py-[3px] items-center">
            <div className="flex space-x-2 items-center rtl:space-x-reverse">
              <Icon type="locationPinIcon" sizes={"xs"} />
              <Typography size={"xs"}>DELIVER TO</Typography>
            </div>
            <button
              className="bg-blue-800 text-sm  h-fit  px-2 py-[2px]  rounded-full flex items-center"
              onClick={() => setaddNewAddress(true)}
            >
              <small className="text-[10px] leading-tight mt-[2px]">
                CHANGE
              </small>
            </button>
          </div>
          {addressData && addressData.length > 0 ? (
            <div className="p-2">
              <table>
                <tbody>
                  <tr>
                    <td className="px-3">
                      <Typography size={"sm"}>NAME:</Typography>
                    </td>
                    <td>
                      <Typography size={"sm"} variant={"lifeText"}>
                        {AddressDataIndex?.name}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <Typography size={"sm"}>ADDRESS:</Typography>
                    </td>
                    <td>
                      <Typography size={"sm"} variant={"lifeText"}>
                        {AddressDataIndex?.google_address}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <Typography size={"sm"}>PHONE:</Typography>
                    </td>
                    <td>
                      <Typography size={"sm"} variant={"lifeText"}>
                        {AddressDataIndex?.phone}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full p-5">
              <Typography
                variant={"paragraph"}
                size={"xs"}
                alignment={"horizontalCenter"}
                className="italic"
              >
                Please click on change and choose delivery address.
              </Typography>
            </div>
          )}
        </div>
        <h5 className="text-life mb-2 font-semibold text-lg">
          Delivery Options
        </h5>

        <div className="shadow-md rounded-lg p-2 border-2 border-muted">
          <div className="bg-violet-200 text-white flex justify-between rounded-full px-5 py-1">
            <div className="flex space-x-2 items-center rtl:space-x-reverse">
              <Icon type="infoIcon" sizes={"xs"} />
              <Typography variant={"lifeText"} size={"xs"}>
                Delivery From: {shipmentData.store_code}
              </Typography>
            </div>
            <Typography variant={"lifeText"} size={"xs"}>
              Shipment 1
            </Typography>
          </div>

          <div className="py-5">
            <div className="flex space-x-3 rtl:space-x-reverse overflow-x-auto scrollbar-thin pb-2">
              {cartItemsData.map((cartData: any) => (
                <div className="min-h-[70px] min-w-[70px] relative border-2 border-muted rounded-lg">
                  <Image
                    src={
                      cartData.items[0].featured_image
                        ? cartData.items[0].featured_image
                        : "/images/default-product-image.png"
                    }
                    alt="pro-img"
                    height="50"
                    width="50"
                    className="h-full w-full"
                  />
                  <div className="absolute -right-2 -bottom-2 rounded-full bg-primary px-2">
                    <Typography variant={"secondary"} size={"sm"}>
                      {" "}
                      x {cartData.items[0].qty}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="divide-gray-300 divide-y border-gray-300 border rounded-lg">
            <RadioGroup
              className={""}
              defaultValue={
                cartItems.cart.shipment_data
                  ? cartItems.cart.shipment_data[0].selected_slot.id
                  : null
              }
              onValueChange={(value) => {
                debugger;
                updateDeliverySlot(
                  {
                    action: "update_slot",
                    data: {
                      store_code: cartItems.cart.shipment_data[0].store_code,
                      slot_id: value,
                    },
                  },
                  cartItems.cart.cart_data.cart_id
                );
              }}
            >
              {shipmentData &&
                shipmentData.available_slots.map(
                  (avSlot: any, indx: number) => (
                    <label
                      htmlFor={`delivery_slot-${indx}`}
                      className={`cursor-pointer flex justify-between items-center  bg-slate-200 px-5 py-3 ${
                        indx % 2 === 0 ? "rounded-t-lg" : "rounded-b-lg"
                      }`}
                    >
                      <div className="flex space-x-4 rtl:space-x-reverse items-center">
                        <RadioGroupItem
                          value={avSlot.id}
                          id={`delivery_slot-${indx}`}
                        />

                        <Image
                          src="https://www.lifepharmacy.com/images/standard-icon.svg"
                          height={40}
                          width={40}
                          alt="standard-icon"
                        />

                        <Typography size={"sm"}>{avSlot.title}</Typography>
                      </div>

                      <Typography size={"sm"}>{avSlot.subtitle}</Typography>
                    </label>
                  )
                )}
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="space-y-4 md:col-span-4 col-span-full md:mt-0 mt-4">
        <div className="rounded-lg space-y-1">
          <Typography size={"sm"} variant={"lifeText"} bold={"bold"}>
            HAVE A COUPON
          </Typography>{" "}
          <Input
            sizes={"sm"}
            placeholder="Enter Coupon Code"
            className="rounded-r-none border-dashed !text-base font-normal"
            type="text"
            value={couponCodeValue}
            onChange={(e) =>
              setCouponCodeValue((e.target as HTMLInputElement).value)
            }
            buttonRight={
              <Button
                onClick={() =>
                  applyCoupon(
                    {
                      action: "apply_coupon",
                      data: {
                        coupon_code: couponCodeValue,
                      },
                    },
                    cartItems.cart.cart_data.cart_id,
                    setInvalidModalState,
                    setAlertMessage
                  )
                }
                className="rounded-l-none"
              >
                Apply
              </Button>
            }
          />
        </div>
        <div className="shadow-md rounded-lg border-muted border p-3 space-y-4">
          <Typography size={"sm"} variant={"lifeText"} bold={"bold"}>
            DELIVER INSTRUCTIONS
          </Typography>{" "}
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
            {cartItems.cart.delivery_instructions &&
              cartItems.cart.delivery_instructions.map((instr: any) => (
                <DeliverInstructionsBtn instr={instr} />
              ))}
          </div>
          <Input
            placeholder="Add a note"
            className=" border-t-0 border-x-0 rounded-none font-normal !text-sm"
            buttonLeft={
              <Image
                src={"https://www.lifepharmacy.com/images/notes.svg"}
                alt="note"
                width={50}
                height={50}
              />
            }
          />
        </div>
        <div className="border-2 border-muted h-fit flex p-2 rounded-lg shadow-sm mb-3 items-center">
          <div className="mr-2">
            <Image
              src={"https://www.lifepharmacy.com/images/return.svg"}
              height={35}
              width={35}
              alt={"delivery"}
            />
          </div>
          <div className="p-1">
            <Typography bold={"bold"} size={"sm"}>
              {" "}
              RETURN POLICY
            </Typography>
            <Typography size={"xs"} variant={"lifeText"}>
              Orders once placed can't be returned or exchanged{" "}
              <span>
                <a className="text-blue-500">Learn More</a>
              </span>{" "}
            </Typography>
          </div>
        </div>
        <div className="border-2 border-muted h-fit  p-3 rounded-lg shadow-md text-life  text-xs space-y-2">
          <Typography bold={"bold"} size={"sm"}>
            ORDER SUMMARY
          </Typography>
          <div
            className={cn(
              "space-y-1",
              typographyVariants({ variant: "lifeText", size: "xs" })
            )}
          >
            <div className="flex justify-between">
              <p>Order Total</p>
              <p>AED {cartSummery.sub_total}</p>
            </div>
            <div className="flex justify-between">
              <p>Items Discount</p>
              <p>- AED {cartSummery.item_discount}</p>
            </div>
            <div className="flex justify-between">
              <p>Estimated VAT %</p>
              <p>AED {cartSummery.vat}</p>
            </div>
            <div className="flex justify-between">
              <p>
                Shipping{" "}
                <span>
                  <a href="#" className="text-blue-500">
                    <small> Know More</small>
                  </a>
                </span>
              </p>
              {cartSummery.shipping_fee != 0 ? (
                <p>{cartSummery.shipping_fee}</p>
              ) : (
                <p>FREE</p>
              )}
              {/* <p> FREE ABOVE 29 AED</p> */}
            </div>
          </div>
          <div className="bg-slate-100 w-10/12 mx-auto h-[1px] my-2 "></div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 ">
              <p>
                {" "}
                <span className="text-life">
                  <b>Total Amount</b>
                </span>{" "}
                (Inclusive of VAT)
              </p>
              <p className="text-blue-500 font-semibold">{cartSummery.total}</p>
            </div>
          </div>
        </div>
        <div className="border border-blue-600 rounded-lg px-3 py-2">
          <div className="flex space-x-2 rtl:space-x-reverse px-2 bg-white -mt-4 w-fit">
            <Typography size={"xs"}>PAYING WITH</Typography>
            <img
              src="https://www.lifepharmacy.com/images/card.svg"
              height={20}
              width={20}
            />
          </div>
          {newCardSelected ? (
            <div className="flex justify-between items-center">
              <p className="text-sm">New Credit or Debit Card</p>
              <u
                onClick={() => setPaymentMethodModalState(true)}
                className="text-blue-500 flex space-x-1 p-2  rtl:space-x-reverse items-center cursor-pointer"
              >
                <small>CHANGE</small>
                <ChevronDown className="w-4 h-4" />
              </u>
            </div>
          ) : (
            <u
              onClick={() => setPaymentMethodModalState(true)}
              className={cn(
                buttonVariants({ variant: "primaryLink" }),
                "space-x-2  rtl:space-x-reverse cursor-pointer"
              )}
            >
              <small>Choose Payment Method</small>
              <Icon type="chevronBottomIcon" sizes={"xs"} />
            </u>
          )}
        </div>
        <div className="sm:flex block sm:space-x-2 sm:rtl:space-x-reverse md:space-y-0 space-y-2">
          <div className="border border-blue-600 rounded-lg px-3 py-2 w-full">
            <div className="px-2 bg-white -mt-3 w-fit">
              <Typography size={"xs"}>TOTAL PAYABLE</Typography>
            </div>
            <Typography variant={"primary"} size={"sm"}>
              AED {cartSummery.total}
            </Typography>
          </div>
          <Button
            onClick={() => setBtnLoadingState(true)}
            isLoading={btnLoadingState}
            size={"lg"}
            disableBtn={!newCardSelected}
            className="w-full text-sm"
          >
            PLACE ORDER{" "}
          </Button>
        </div>
      </div>
      <PaymentMethodModal
        newCardSelected={newCardSelected}
        setNewCardSelectedState={setNewCardSelectedState}
        showModal={paymentMethodModalState}
        setCloseModal={setPaymentMethodModalState}
      />
      <InvalidOTPModal
        isWarning={false}
        showModal={invalidModalState && alertMessage !== (undefined || "")}
        setCloseModal={setInvalidModalState}
        modalMessage={alertMessage}
        modalHeader="Oops..."
        buttonProps={
          <Button
            className="mx-auto w-full"
            onClick={() => {
              setInvalidModalState(false);
            }}
          >
            OK
          </Button>
        }
      />
      
    </div>
  ) : (
    <></>
  );
}
