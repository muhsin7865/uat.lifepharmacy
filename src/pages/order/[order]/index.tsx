import BreadCrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Typography } from "@/components/ui/typography";
import getSingleOrderDetails from "@/lib/getSingleOrderDetails";
import Image from "next/image";
import Link from "next/link";

export default function SingleOrderDetailsPage({
  singleOrderData,
}: {
  singleOrderData: any;
}) {
  return (
    <div className="container-page">
      <BreadCrumb
        menuData={["Dashboard", `#${singleOrderData.order_id}`]}
        type=""
      />
      <div className="grid grid-cols-12 gap-5 py-4">
        <div className="md:col-span-8 space-y-5 col-span-full">
          <div className="border border-muted shadow-md rounded-md p-6 space-y-2 ">
            <Typography bold={"semibold"}>Shipping Address</Typography>
            <hr />
            <div className="py-3 space-y-2">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Icon type="homeIconMenu" sizes={"sm"} />
                <Typography size={"sm"} variant={"paragraph"}>
                  Flat / Villa
                </Typography>
                <Typography size={"sm"} variant={"paragraph"}>
                  #{singleOrderData.address_details.building}
                </Typography>
                <Typography size={"sm"} variant={"paragraph"}>
                  Building
                </Typography>
                <Typography size={"sm"} variant={"paragraph"}>
                  #{singleOrderData.address_details.building}
                </Typography>
              </div>

              <div className="flex rtl:space-x-reverse space-x-2">
                <Icon type="locationPinIcon" sizes={"sm"} />
                <Typography size={"sm"} variant={"paragraph"}>
                  #{singleOrderData.address_details.google_address}
                </Typography>
              </div>
              <div className="flex rtl:space-x-reverse space-x-2">
                <Icon type="callIcon" sizes={"sm"} />
                <Typography size={"sm"} variant={"paragraph"}>
                  #{singleOrderData.address_details.phone}
                </Typography>
              </div>
            </div>
          </div>
          <div className="border border-muted shadow-md  rounded-md p-6 ">
            <Button
              variant={"normal"}
              size={"lg"}
              className="!text-xs block mb-4"
            >
              Pending Payment
            </Button>
            <table>
              <thead className="text-primary ">
                <tr>
                  <th className="pr-6 py-1">
                    <Typography>Product</Typography>
                  </th>
                  <th className="px-6 py-1 w-[9rem]">
                    <Typography>Qty</Typography>
                  </th>
                  <th className="px-6 py-1">
                    <Typography>Total</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {singleOrderData.items.map((item: any) => (
                  <tr className="border-b">
                    <td className="py-3 ">
                      <Link
                        href={`/product${item.slug}`}
                        className="flex items-center "
                      >
                        <Image
                          width={40}
                          height={40}
                          alt="Product"
                          src={item.featured_image}
                        />
                        <Typography
                          className="pl-2"
                          size={"sm"}
                          bold={"light"}
                          variant={"paragraph"}
                        >
                          {item.title}
                        </Typography>
                      </Link>
                    </td>{" "}
                    <td className="text-center px-6 py-3">
                      <Typography
                        className="pl-2"
                        size={"sm"}
                        bold={"light"}
                        variant={"paragraph"}
                      >
                        x 1
                      </Typography>
                    </td>{" "}
                    <td>
                      <Typography
                        size={"sm"}
                        bold={"light"}
                        variant={"paragraph"}
                      >
                        AED 135.00
                      </Typography>
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-dashed">
                  <td className="py-3 "></td>{" "}
                  <td className="text-center py-3">
                    <Typography
                      className="pl-2"
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      Sub Total
                    </Typography>
                  </td>{" "}
                  <td>
                    <Typography
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      AED {singleOrderData.sub_total.toFixed(2)}
                    </Typography>
                  </td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-3 "></td>{" "}
                  <td className="text-center py-3">
                    <Typography
                      className="pl-2"
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      Discount
                    </Typography>
                  </td>{" "}
                  <td>
                    <Typography
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      AED {singleOrderData.discount.toFixed(2)}
                    </Typography>
                  </td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-3 "></td>{" "}
                  <td className="text-center  py-3">
                    <Typography
                      className="pl-2"
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                      whitespace={"nowrap"}
                    >
                      Delivery Fees
                    </Typography>
                  </td>{" "}
                  <td>
                    <Typography
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      AED {singleOrderData.discount.toFixed(2)}
                    </Typography>
                  </td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-3 "></td>{" "}
                  <td className="text-center  py-3">
                    <Typography
                      className="pl-2"
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                      whitespace={"nowrap"}
                    >
                      Tax
                    </Typography>
                  </td>{" "}
                  <td>
                    <Typography
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      AED {singleOrderData.tax.toFixed(2)}
                    </Typography>
                  </td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-3 "></td>{" "}
                  <td className="text-center  py-3">
                    <Typography
                      className="pl-2"
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                      whitespace={"nowrap"}
                    >
                      Total
                    </Typography>
                  </td>{" "}
                  <td>
                    <Typography
                      size={"sm"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      AED {singleOrderData.total.toFixed(2)}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <div className="border border-slate-300 shadow-sm rounded-md p-3"></div> */}
          </div>
        </div>
        <div className="md:col-span-4 col-span-full">
          <div className="border border-muted shadow-md  rounded-md p-6 space-y-2">
            <div className="flex justify-between items-center">
              <Typography bold={"semibold"}>Order Summary</Typography>
              <Button variant={"normal"} size={"lg"} className="!text-xs block">
                Pending Payment
              </Button>
            </div>
            <hr />
            <div className="text-center py-3 border-b flex justify-between">
              <Typography
                className="pl-2"
                size={"sm"}
                bold={"semibold"}
                variant={"paragraph"}
              >
                Sub Total
              </Typography>{" "}
              <Typography size={"sm"} bold={"semibold"} variant={"paragraph"}>
                AED {singleOrderData.sub_total.toFixed(2)}
              </Typography>
            </div>
            <div className="text-center py-3 border-b flex justify-between">
              <Typography
                className="pl-2"
                size={"sm"}
                bold={"semibold"}
                variant={"paragraph"}
              >
                Items Discount
              </Typography>{" "}
              <Typography size={"sm"} bold={"semibold"} variant={"paragraph"}>
                AED {singleOrderData.sub_total.toFixed(2)}
              </Typography>
            </div>
            <div className="py-3 ">
              <Typography className="pl-2 pb-2" bold={"semibold"}>
                Shipping:
              </Typography>{" "}
              <div className="text-center py-3  flex justify-between">
                <Typography
                  className="pl-2"
                  size={"sm"}
                  bold={"semibold"}
                  variant={"paragraph"}
                >
                  Delivery Fees
                </Typography>{" "}
                <Typography size={"sm"} bold={"semibold"} variant={"paragraph"}>
                  AED {singleOrderData.delivery_fees.toFixed(2)}
                </Typography>
              </div>
              <div className="text-center py-3 flex justify-between">
                <Typography
                  className="pl-2"
                  size={"sm"}
                  bold={"semibold"}
                  variant={"paragraph"}
                >
                  Estimate VAT
                </Typography>{" "}
                <Typography size={"sm"} bold={"semibold"} variant={"paragraph"}>
                  AED {singleOrderData.tax.toFixed(2)}
                </Typography>
              </div>
              {/* delivery_fees */}
              <div className="border-t flex justify-between py-3 ">
                <Typography
                  className="pl-2"
                  bold={"semibold"}
                  variant={"primary"}
                >
                  Total
                </Typography>{" "}
                <Typography size={"sm"} bold={"semibold"} variant={"primary"}>
                  AED {singleOrderData.total.toFixed(2)}
                </Typography>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse items-start ">
                <RadioGroup className={""}>
                  <div className="flex space-x-2 items-center">
                    <RadioGroupItem
                      value=""
                      checked={true}
                      id="payment_type"
                      className="mt-1.5 cursor-pointer"
                    />
                    <div className="w-full space-y-3 cursor-pointer">
                      <Typography variant={"paragraph"} size={"sm"}>
                        Credit / Debit Card
                      </Typography>
                      <Image
                        alt="payment_methods"
                        src={
                          "https://www.lifepharmacy.com/images/payments-summary.png"
                        }
                        width={200}
                        height={200}
                      />

                      <Typography
                        bold={"light"}
                        size={"xs"}
                        variant={"paragraph"}
                      >
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </Typography>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <Button className="w-full">PAY TO CONFIRM</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const singleOrderData = await getSingleOrderDetails(context.params?.order);

  return {
    props: {
      singleOrderData: singleOrderData.data,
    },
  };
};
