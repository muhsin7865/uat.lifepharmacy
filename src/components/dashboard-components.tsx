import { useSession } from "next-auth/react";
import { Typography, typographyVariants } from "./ui/typography";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { Icon } from "./ui/icons";
import { Upload } from "lucide-react";
import { Input, inputVariants } from "./ui/input";
import Image from "next/image";
import { useModal } from "./ui/modalcontext";
import { AddNewAddressForm } from "./addnewAddressForm";
import { useForm } from "react-hook-form";
import deleteAddress from "@/lib/deleteAddress";
import updateUserData from "@/lib/updateUserData";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import getAppointmentsDetails from "@/lib/getAppointmentsData";
import getPrecriptionList from "@/lib/getPrescriptionList";
import getOrderDetails from "@/lib/getorderDetails";
import { RadioGroup, RadioGroupItem } from "./ui/radio";

const DashboardComp = ({ setActiveMenuItem }: { setActiveMenuItem: any }) => {
  const { data: session } = useSession();
  return (
    <div className=" w-full space-y-4 ">
      <div className="w-full py-5 px-3 rounded-lg shadow-sm border-muted border text-sm space-y-2">
        <div className="flex space-x-2 flex-wrap rtl:space-x-reverse">
          <Typography variant={"paragraph"}>Hello</Typography>
          <Typography bold={"bold"}>
            {session && session.user ? session?.user.name : "User"} !
          </Typography>
        </div>

        <Typography size={"sm"} variant={"paragraph"}>
          From your account dashboard you can view your{" "}
          <Button
            onClick={() => setActiveMenuItem("orders")}
            variant={"primaryLink"}
            size={"sm"}
            className="underline-offset-4 underline"
          >
            recent orders
          </Button>{" "}
          , manage your{" "}
          <Button
            variant={"primaryLink"}
            size={"sm"}
            onClick={() => setActiveMenuItem("addresses")}
          >
            shipping and billing addresses
          </Button>
          <Button
            variant={"primaryLink"}
            size={"sm"}
            onClick={() => setActiveMenuItem("accountDetails")}
          >
            , and edit your account details.{" "}
          </Button>
        </Typography>
      </div>
      <div className="space-y-2">
        <Typography>Recent Purchases</Typography>

        <div className="w-full py-5 px-3 rounded-lg border-muted border  space-y-4 sm:text-sm text-xs">
          <Typography size={"sm"}>
            <i>You don't have any product yet!</i>
          </Typography>
        </div>
      </div>
    </div>
  );
};

const OrderComp = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const { data: session } = useSession();

  useEffect(() => {
    getProductOrderDetails();
  }, []);

  const getProductOrderDetails = () => {
    getOrderDetails(session?.token.token).then((res) =>
      setOrderDetails(res.data)
    );
  };

  const redirect = (pathname: string) => {
    router.push(pathname);
  };
  
  return orderDetails && orderDetails.length > 0 ? (
    <div className="space-y-2">
      {orderDetails.map((orderDetail: any) => (
        <div className="rounded-lg shadow-sm w-full border border-muted px-7 py-4 md:flex block justify-between">
          <div className="flex flex-col space-y-3">
            <Typography
              bold={"extrabold"}
              className="md:!text-left !text-center"
            >
              #{orderDetail.order_id}
            </Typography>
            <div className="pb-2 space-y-2">
              <Typography
                bold={"light"}
                size={"sm"}
                variant={"paragraph"}
                className="md:!text-left !text-center"
              >
                {orderDetail.user_details.name}
              </Typography>
              <Typography
                bold={"light"}
                size={"sm"}
                variant={"paragraph"}
                className="md:!text-left !text-center"
              >
                {orderDetail.user_details.phone}
              </Typography>
              <Typography
                bold={"light"}
                size={"sm"}
                variant={"paragraph"}
                className="md:!text-left !text-center"
              >
                {orderDetail.address_details.google_address}
              </Typography>
            </div>
          </div>
          <div className="space-y-2 ">
            <Typography
              alignment={"horizontalCenter"}
              size={"lg"}
              variant={"primary"}
              whitespace={"nowrap"}
            >
              {" "}
              <Typography size={"sm"} type="span">
                AED
              </Typography>{" "}
              {orderDetail.total.toFixed(2)}
            </Typography>
            <Button
              variant={"normal"}
              size={"lg"}
              className="!text-xs block mx-auto w-full !text-center"
            >
              Pending Payment
            </Button>
            <Link
              href={`/order/${orderDetail.id}`}
              className={cn(
                "!text-xs block mx-auto !w-full !text-center",
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                  rounded: "sm",
                })
              )}
            >
              ORDER DETAILS
            </Link>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
      <Typography size={"sm"}>
        <i>No order has been made yet.</i>
      </Typography>
      <Button
        onClick={() => redirect("/products")}
        variant={"outline"}
        iconRight={
          <Icon type="chevronRightIcon" sizes={"sm"} className="ml-2" />
        }
      >
        GO SHOP
      </Button>
    </div>
  );
};

const ReturnOrdersComp = () => {
  const router = useRouter();

  const redirect = (pathname: string) => {
    router.push(pathname);
  };
  return (
    <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
      <Typography size={"sm"} variant={"paragraph"}>
        No return order has been made yet.
      </Typography>
      <Button
        onClick={() => redirect("/products")}
        variant={"outline"}
        className="px-10"
        iconRight={
          <Icon type="rightArrowIcon" sizes={"sm"} className="ml-2 " />
        }
      >
        GO SHOP
      </Button>
    </div>
  );
};

const PrescriptionComp = () => {
  type precriptionForms = {
    uaePrescription: boolean;
    noPresription: boolean;
  };
  const [prescriptionUploadOnclick, setPrescriptionUploadState] =
    useState<any>(false);
  const [prescriptionFormVisibility, setPrescriptionFormVisibility] =
    useState<precriptionForms>({
      uaePrescription: false,
      noPresription: false,
    });
  const [precriptionDetailsVisibility, setPrecriptionDetailsVisibility] =
    useState(false);
  const [prescriptionData, setPrescriptionData] = useState<any>(null);

  useEffect(() => {
    getPrecriptionList().then((res) => setPrescriptionData(res));
  }, []);
  const formatDate = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDate;
  };
  return (
    <div className=" w-full  ">
      <div className="space-y-3">
        <div className="flex justify-between border-b border-muted pb-3">
          <Typography size={"xl"} bold={"semibold"} variant={"lifeText"}>
            Prescriptions
          </Typography>
          {!prescriptionUploadOnclick ? (
            <Button
              onClick={() => setPrescriptionUploadState(true)}
              rounded={"full"}
              className="!text-sm"
              variant={"normal"}
              iconLeft={<Icon type="plusIcon" sizes={"sm"} className="mr-2" />}
            >
              Upload
            </Button>
          ) : (
            <Button
              rounded={"full"}
              className="!text-sm"
              variant={"normal"}
              iconLeft={
                <Icon type="chevronLeftIcon" sizes={"sm"} className="mr-2" />
              }
              onClick={() => {
                prescriptionFormVisibility.noPresription ||
                prescriptionFormVisibility.uaePrescription
                  ? setPrescriptionFormVisibility({
                      uaePrescription: false,
                      noPresription: false,
                    })
                  : setPrescriptionUploadState(false);
              }}
            >
              Back
            </Button>
          )}
        </div>
        {prescriptionUploadOnclick ? (
          prescriptionFormVisibility.uaePrescription ? (
            <div className="rounded-lg border border-muted shadow-md p-3 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between ">
                  <Typography variant={"lifeText"} bold={"semibold"}>
                    Upload Prescription
                  </Typography>
                  <Button
                    variant={"primaryLink"}
                    iconRight={
                      <Icon
                        type="infoIcon"
                        sizes={"sm"}
                        className="ltr:ml-1 rtl:mr-1 text-blue-500"
                      />
                    }
                    size={"sm"}
                  >
                    Instructions
                  </Button>
                </div>
                <div className="w-full flex justify-between shadow-sm items-center bg-[#f4f7ff] p-4 rounded-lg">
                  <Typography variant={"lifeText"} bold={"light"} size={"sm"}>
                    Prescription
                  </Typography>
                  <label
                    htmlFor="uae_precription_file"
                    className={cn(
                      buttonVariants({ variant: "white" }),
                      "text-life border border-muted shadow-sm "
                    )}
                  >
                    <div className="space-x-2 flex items-center cursor-pointer">
                      <input
                        type="file"
                        id="uae_precription_file"
                        className="hidden"
                      />
                      <Upload className="w-5 h-5  " />
                      <span> UPLOAD NOW</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between ">
                    <Typography variant={"lifeText"} bold={"semibold"}>
                      Patient's ID and Insurance Details
                    </Typography>
                  </div>
                  <div className="w-full flex justify-between shadow-sm items-center bg-[#f4f7ff] p-4 rounded-lg">
                    <Typography variant={"lifeText"} bold={"light"} size={"sm"}>
                      Emirates ID
                    </Typography>
                    <label
                      htmlFor="uae_precription_file"
                      className={cn(
                        buttonVariants({ variant: "white" }),
                        "text-life border border-muted shadow-sm "
                      )}
                    >
                      <div className="space-x-2 flex items-center cursor-pointer">
                        <input
                          type="file"
                          id="uae_precription_file"
                          className="hidden"
                        />
                        <Upload className="w-5 h-5  " />
                        <span> UPLOAD NOW</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between ">
                    <Typography variant={"lifeText"} bold={"semibold"}>
                      Upload Prescription
                    </Typography>
                  </div>
                  <div className="w-full flex justify-between shadow-sm items-center bg-[#f4f7ff] p-4 rounded-lg">
                    <Typography variant={"lifeText"} bold={"light"} size={"sm"}>
                      Insurance ID (Optional)
                    </Typography>
                    <label
                      htmlFor="uae_precription_file"
                      className={cn(
                        buttonVariants({ variant: "white" }),
                        "text-life border border-muted shadow-sm "
                      )}
                    >
                      <div className="space-x-2 flex items-center cursor-pointer">
                        <input
                          type="file"
                          id="uae_precription_file"
                          className="hidden"
                        />
                        <Upload className="w-5 h-5  " />
                        <span> UPLOAD NOW</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <textarea
                rows={4}
                placeholder="Additional Info"
                className={cn(
                  inputVariants({ sizes: "sm" }),
                  "placeholder:text-sm"
                )}
              ></textarea>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Image
                    src={"	https://www.lifepharmacy.com/images/lock.svg"}
                    width={20}
                    height={20}
                    alt="lock_img"
                    className="mx-auto"
                  />
                  <Typography
                    size={"sm"}
                    alignment={"horizontalCenter"}
                    variant={"lifeText"}
                  >
                    All your data is safe & secure with us
                  </Typography>
                </div>
                <Button variant={"default"} size={"lg"} className="w-full">
                  PROCEED NOW
                </Button>
              </div>
            </div>
          ) : prescriptionFormVisibility.noPresription ? (
            <div className="rounded-lg border border-muted shadow-md p-3 space-y-6">
              <div className="space-y-2">
                <Typography variant={"lifeText"} bold={"semibold"}>
                  Provide Your Medicines Details
                </Typography>
                <textarea
                  rows={4}
                  placeholder="Additional Info"
                  className={cn(
                    inputVariants({ sizes: "sm" }),
                    "placeholder:text-sm"
                  )}
                ></textarea>
              </div>
              <div className="w-full flex justify-between shadow-sm items-center bg-[#f4f7ff] p-4 rounded-lg">
                <Typography variant={"lifeText"} bold={"light"} size={"sm"}>
                  Please attach medicine image to proceed Help
                </Typography>
                <label
                  htmlFor="uae_precription_file"
                  className={cn(
                    buttonVariants({ variant: "white" }),
                    "text-life border border-muted shadow-sm "
                  )}
                >
                  <div className="space-x-2 flex items-center cursor-pointer">
                    <input
                      type="file"
                      id="uae_precription_file"
                      className="hidden"
                    />
                    <Upload className="w-5 h-5  " />
                    <span> UPLOAD NOW</span>
                  </div>
                </label>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Image
                    src={"	https://www.lifepharmacy.com/images/lock.svg"}
                    width={20}
                    height={20}
                    alt="lock_img"
                    className="mx-auto"
                  />
                  <Typography
                    size={"sm"}
                    alignment={"horizontalCenter"}
                    variant={"lifeText"}
                  >
                    All your data is safe & secure with us
                  </Typography>
                </div>
                <Button variant={"default"} size={"lg"} className="w-full">
                  PROCEED NOW
                </Button>
              </div>
            </div>
          ) : (
            prescriptionUploadOnclick && (
              <div>
                <Image
                  src={
                    "	https://www.lifepharmacy.com/images/prescription-banner.png"
                  }
                  height={500}
                  width={1024}
                  className="w-full"
                  alt="precription_featured_image"
                />
                <div className="pt-10 pb-6  space-y-1">
                  <Typography
                    variant={"lifeText"}
                    size={"xl"}
                    bold={"semibold"}
                    alignment={"horizontalCenter"}
                  >
                    Getting Your Medicines is Easy Now!
                  </Typography>
                  <Typography
                    alignment={"horizontalCenter"}
                    variant={"lifeText"}
                    bold={"light"}
                    className="w-[50%] mx-auto"
                  >
                    Send us a picture of your prescription or the medicine you
                    are looking for
                  </Typography>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      setPrescriptionFormVisibility({
                        uaePrescription: false,
                        noPresription: true,
                      })
                    }
                    className="rounded-lg shadow-sm border border-muted flex justify-between p-4 items-center w-full"
                  >
                    <div className="flex space-x-4 rtl:space-x-reverse">
                      <div>
                        <Image
                          src={
                            "	https://www.lifepharmacy.com/images/prescription1.png"
                          }
                          height={60}
                          width={60}
                          alt="Uae_precription"
                        />
                      </div>

                      <div>
                        <Typography variant={"lifeText"} bold={"semibold"}>
                          I have a Valid UAE Prescription
                        </Typography>
                        <Typography
                          alignment={"horizontalCenter"}
                          variant={"lifeText"}
                          bold={"light"}
                          size={"sm"}
                        >
                          Upload Insurance or Non-Insurance Prescriptions
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <Icon type="rightArrowIcon" className="text-slate-300" />
                    </div>
                  </button>
                  <div
                    onClick={() =>
                      setPrescriptionFormVisibility({
                        uaePrescription: false,
                        noPresription: true,
                      })
                    }
                    className="rounded-lg shadow-sm border border-muted flex justify-between p-4 items-center cursor-pointer"
                  >
                    <div className="flex space-x-4 rtl:space-x-reverse">
                      <div>
                        <Image
                          src={
                            "	https://www.lifepharmacy.com/images/prescription2.png"
                          }
                          height={60}
                          width={60}
                          alt="Uae_precription"
                        />
                      </div>

                      <div>
                        <Typography variant={"lifeText"} bold={"semibold"}>
                          I don't have a Prescription
                        </Typography>
                        <Typography
                          alignment={"horizontalCenter"}
                          variant={"lifeText"}
                          bold={"light"}
                          size={"sm"}
                        >
                          Upload any Images or Tell us what you are looking for
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <Icon type="rightArrowIcon" className="text-slate-300" />
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : prescriptionUploadOnclick &&
          prescriptionData &&
          prescriptionData.data.length > 0 ? (
          !precriptionDetailsVisibility ? (
            prescriptionData.data.map((prescription: any) => (
              <div
                onClick={() => setPrecriptionDetailsVisibility(true)}
                className="cursor-pointer hover:bg-slate-50 rounded-lg shadow-sm w-full border border-muted px-7 py-4 md:flex block justify-between"
              >
                <div className="flex flex-col space-y-3">
                  <Typography
                    bold={"semibold"}
                    className="md:!text-left !text-center"
                  >
                    Request ID #{prescription.id}
                  </Typography>
                  <div className="pb-2">
                    <Typography
                      bold={"light"}
                      size={"sm"}
                      variant={"paragraph"}
                      className="md:!text-left !text-center"
                    >
                      {formatDate(prescription.created_at)}
                    </Typography>
                  </div>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse items-center">
                  <Button
                    variant={"normal"}
                    size={"lg"}
                    className="!text-xs block mx-auto w-full !text-center h-fit"
                  >
                    {prescription.status_label}
                  </Button>
                  <Icon
                    type="chevronRightIcon"
                    sizes={"lg"}
                    className="text-slate-400"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full">
              <div className="flex justify-between border-b pb-3">
                <div className="space-x-3 rtl:space-x-reverse flex items-center">
                  <Image
                    height={"50"}
                    width={"50"}
                    src="https://www.lifepharmacy.com/images/svg/emirates_id_front.svg"
                    alt="emirates_id_front"
                  />
                  <Typography bold={"semibold"}>Emirates ID Front</Typography>
                </div>

                <Image
                  height={"50"}
                  width={"50"}
                  src={prescriptionData.data[0].emirates_id_front}
                  alt="emiratedId"
                />
              </div>
              <div className="flex justify-between py-3 border-b">
                <div className="space-x-3 rtl:space-x-reverse flex items-center">
                  <Image
                    height={"50"}
                    width={"50"}
                    src="https://www.lifepharmacy.com/images/svg/insurance_card_front.svg"
                    alt="insurance_card_front"
                  />
                  <Typography bold={"semibold"}>
                    Insurance Card Front
                  </Typography>
                </div>

                <Image
                  height={"50"}
                  width={"50"}
                  src={prescriptionData.data[0].insurance_card_front}
                  alt="emiratedId"
                />
              </div>{" "}
              <div className="flex justify-between  pt-3">
                <div className="space-x-3 rtl:space-x-reverse flex items-center">
                  <Image
                    height={"70"}
                    width={"70"}
                    className="-ml-4"
                    src="https://www.lifepharmacy.com/images/svg/prescription_icon.svg"
                    alt="prescription_icon"
                  />
                  <Typography bold={"semibold"}>Prescription</Typography>
                </div>
                {prescriptionData.data[0].prescription.map(
                  (pres_img: string) => (
                    <Image
                      height={"50"}
                      width={"50"}
                      src={pres_img}
                      alt="emiratedId"
                    />
                  )
                )}
              </div>
            </div>
          )
        ) : (
          <div className="space-y-5">
            <Typography size={"sm"} variant={"paragraph"}>
              No prescription has been made yet.
            </Typography>
            <Button
              variant={"outline"}
              iconRight={<Icon type="plusIcon" className="ml-2" sizes={"sm"} />}
            >
              ADD PRESCRIPTION
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const AddressComp = () => {
  const { data: session, update } = useSession();

  const {
    addressData,
    addnewAddressFormVisibility,
    setaddnewAddressFormVisibility,
  } = useModal();

  const {
    handleSubmit: addressDataSubmit,
    register: registerAddnewAddressForm,
    getValues: getAddressValues,
    setValue: setAddressValues,
    formState: { isValid, errors: addressFormErrors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div className="py-4 w-full space-y-5">
      <div className="space-y-3">
        <Typography size="sm" variant={"paragraph"}>
          The following addresses will be used on the checkout page by default.
        </Typography>
        <div className="flex space-x-2 items-center rtl:space-x-reverse">
          {!addnewAddressFormVisibility ? (
            <button>
              <Icon type="locationPinIcon" sizes={"sm"} />
            </button>
          ) : (
            <button onClick={() => setaddnewAddressFormVisibility(false)}>
              <Icon type="chevronLeftIcon" sizes={"sm"} />
            </button>
          )}
          <Typography variant={"lifeText"} bold={"bold"}>
            Addresses
          </Typography>
        </div>
      </div>

      {addnewAddressFormVisibility ? (
        <div className="p-3 border border-muted rounded-lg ">
          <AddNewAddressForm
            isModal={false}
            getValues={getAddressValues}
            errors={addressFormErrors}
            handleSubmit={addressDataSubmit}
            register={registerAddnewAddressForm}
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-3">
          {addressData.map((addr: any) => (
            <div className="border-muted border shadow-sm rounded-lg px-4 py-3 space-y-4 h-full flex flex-col justify-between ">
              <div className="space-y-2">
                <Typography size={"sm"} bold={"bold"} variant={"lifeText"}>
                  {addr.type}
                </Typography>
                <div className="w-full bg-[#dee2e6] mx-auto h-[1px]"></div>
                <div>
                  <Typography size={"xs"} bold={"semibold"} className="mb-2">
                    {addr.name}
                  </Typography>
                  <Typography size={"xs"}>{addr.google_address}</Typography>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant={"white"}
                  size={"sm"}
                  className={typographyVariants({
                    variant: "primary",
                    size: "sm",
                  })}
                  iconRight={
                    <Icon type="editIcon" sizes={"xs"} className="ml-1" />
                  }
                  onClick={() => {
                    setAddressValues("name", addr.name);
                    setAddressValues("phone", addr.phone);
                    setAddressValues("type", addr.type);
                    setAddressValues("state", addr.state);
                    setAddressValues("city", addr.city);
                    setAddressValues("street_address", addr.street_address);
                    setAddressValues("flat_number", addr.flat_number);
                    setAddressValues("building", addr.building);
                    setAddressValues("country", addr.country);
                    setAddressValues("additional_info", addr.additional_info);
                    setaddnewAddressFormVisibility(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant={"white"}
                  size={"xs"}
                  className={typographyVariants({
                    variant: "danger",
                    size: "sm",
                  })}
                  onClick={() => {
                    update();
                    deleteAddress(
                      {
                        address_id: addr.id,
                      },
                      session?.token.token
                    );
                  }}
                  iconRight={
                    <Icon type="crossIcon" sizes={"sm"} className="ml-1" />
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button
            onClick={() => {
              setAddressValues("name", "");
              setAddressValues("phone", "");
              setAddressValues("type", "");
              setAddressValues("state", "");
              setAddressValues("city", "");
              setAddressValues("street_address", "");
              setAddressValues("flat_number", "");
              setAddressValues("building", "");
              setAddressValues("country", "");
              setAddressValues("additional_info", "");
              setaddnewAddressFormVisibility(true);
            }}
            variant={"outline"}
            className="w-full h-[147px]"
            iconLeft={<Icon type="editIcon" sizes={"sm"} className="mr-2 " />}
          >
            New Address
          </Button>
        </div>
      )}
    </div>
  );
};

const AccountDetailsComp = () => {
  const { data: session } = useSession();
  const [currentGender, setSelectedGender] = useState<any>(
    session?.token.gender
  );
  console.log(session?.token);

  const {
    handleSubmit: userDetailsSubmit,
    register: registerUserDetails,
    getValues: getUserDetails,
    setValue: setUserDetailsData,
    formState: { errors: userDetailsErrors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: session?.token.name,
      email: session?.token.email,
      phone: session?.token.phone,
      gender: session?.token.phone,
    },
    values: {
      gender: currentGender,
    },
  });

  const userDetailsDataOnSubmit = (data: any) => {
    debugger;
    console.log(data);

    updateUserData(session?.token.token, {
      ...session?.token,
      ...data,
    }).then((res) => {
      debugger;
      console.log(res);
    });
  };

  const genders = ["male", "female", "others"];

  return (
    <div className=" w-full px-4 py-5 border border-muted rounded-lg h-fit">
      <form
        className="space-y-6 mb-4"
        onSubmit={userDetailsSubmit(userDetailsDataOnSubmit)}
      >
        <div className="w-full space-y-2">
          <Typography requiredField={true} size={"sm"} variant={"paragraph"}>
            Full Name
          </Typography>
          <Input
            {...registerUserDetails("name", {
              required: true,
              value: session?.token.name,
            })}
            className={`${
              userDetailsErrors.name?.type === "required"
                ? "border-red-500"
                : ""
            }`}
            sizes={"sm"}
            placeholder="Full Name *"
            required
          />
          <Typography size={"xs"} variant={"paragraph"}>
            Here is shown your first and last name.
          </Typography>
          {userDetailsErrors.name?.type === "required" && (
            <Typography size={"xs"} variant={"danger"}>
              Full Name is Required!
            </Typography>
          )}
        </div>

        <div className="w-full space-y-2">
          <Typography requiredField={true} size={"sm"} variant={"paragraph"}>
            {session?.token.email ? "Email Address" : "Phone Number"}
          </Typography>
          <Input
            sizes={"sm"}
            type="text"
            {...registerUserDetails(session?.token.email ? "email" : "phone", {
              required: true,
              value: session?.token.email
                ? session.token.email
                : session?.token.phone,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            className={`${
              session?.token.email
                ? userDetailsErrors.email?.type
                : userDetailsErrors.phone?.type === "required"
                ? "border-red-500"
                : ""
            }`}
            placeholder={
              session?.token.email ? "Email Address *" : "Phone Number *"
            }
            required
          />
        </div>
        <div className="w-full space-y-3">
          <Typography size={"sm"} variant={"paragraph"}>
            Gender (optional)
          </Typography>

          <RadioGroup
            defaultValue={genders[0]}
            className={"flex space-x-2 rtl:space-x-reverse"}
          >
            {genders.map((item) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() => {
                    debugger;
                    setSelectedGender(item);
                  }}
                  id={item}
                  value={item}
                />
                <label
                  htmlFor={item}
                  className={"capitalize "+typographyVariants({ size: "default" })}
                >
                  {item}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button
          variant={"outline"}
          type="submit"
          className="px-5 py-2.5"
          size={"sm"}
          iconRight={
            <Icon type="rightArrowIcon" sizes={"sm"} className="ml-2" />
          }
        >
          SAVE CHANGES
        </Button>
      </form>
    </div>
  );
};

const WalletComp = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const redirect = (pathname: string) => {
    router.push(pathname);
  };
  return (
    <div className="space-y-3 w-full ">
      <div className="bg-[#f4f7ff] p-3 rounded-lg w-full space-x-2 rtl:space-x-reverse sm:text-sm text-xs flex items-center">
        <Typography bold={"semibold"}>Wallet Balance: </Typography>
        <Typography variant={"lifeText"} size={"sm"} bold={"semibold"}>
          AED {session?.token.wallet_balance}.00
        </Typography>
      </div>
      <div className="border border-muted rounded-lg p-5 space-y-3">
        <Typography size={"sm"} variant={"paragraph"}>
          <i>No transactions has been made yet.</i>
        </Typography>

        <Button
          onClick={() => redirect("/products")}
          variant={"outline"}
          className="px-6 py-2.5"
          size={"sm"}
          iconRight={
            <Icon type="rightArrowIcon" sizes={"sm"} className="ml-3" />
          }
        >
          GO SHOP
        </Button>
      </div>
    </div>
  );
};

const AppointmentsComp = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const redirect = (pathname: string) => {
    router.push(pathname);
  };
  const [appointmentDetailsData, setAppointmentDetailsData] =
    useState<any>(null);

  useEffect(() => {
    getAppointmentsDetailsData("upcoming");
  }, []);

  type appointmentStatus = "upcoming" | "completed";

  const getAppointmentsDetailsData = (status: appointmentStatus) => {
    getAppointmentsDetails(status, session?.token.token).then((res) => {
      setAppointmentDetailsData(res.data);
    });
  };

  return (
    <div className="py-4 w-full  flex sm:flex-row flex-col justify-between ">
      <div className="space-y-5">
        <div className="space-y-5">
          <Tabs defaultValue="pending" className="border-none">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="pending"
                className="z-20"
                onClick={() => getAppointmentsDetailsData("upcoming")}
              >
                <Typography bold={"semibold"} size={"sm"}>
                  PENDING
                </Typography>
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                onClick={() => getAppointmentsDetailsData("completed")}
              >
                <Typography bold={"semibold"} size={"sm"}>
                  COMPLETED
                </Typography>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {appointmentDetailsData && appointmentDetailsData.length === 0 && (
            <Typography size={"sm"} variant={"paragraph"}>
              No appointment has been made yet.
            </Typography>
          )}
        </div>

        <Button
          onClick={() => redirect("/doctors")}
          variant={"outline"}
          className="px-6 py-2.5"
          size={"sm"}
          iconRight={
            <Icon type="rightArrowIcon" sizes={"sm"} className="ml-3" />
          }
        >
          BOOK AN APPOINTMENT
        </Button>
      </div>
    </div>
  );
};

export {
  DashboardComp,
  OrderComp,
  ReturnOrdersComp,
  PrescriptionComp,
  AddressComp,
  AccountDetailsComp,
  WalletComp,
  AppointmentsComp,
};
