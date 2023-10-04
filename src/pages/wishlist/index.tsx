import BreadCrumb from "@/components/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { useCartActions } from "@/hooks/useCartActions";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function WishListPage({}) {
  const wishlistItems = useSelector(
    (state: RootState) => state.cart.wishlist.data
  );
  const { removeWishList, createCart } = useCartActions();
  const { currentCountryDetails } = useLanguage();

  const clearCartState = () => {
    cartInit.data.items = [];
    cartInit.action = "";
  };

  const cartInit: any = {
    action: "",
    data: {
      items: [],
      address_id: null,
    },
  };

  const addToCart = (proId: string) => {
    cartInit.data.items.push({ id: proId, qty: 1 });
    createCart(cartInit);
    clearCartState();
    removeWishList(proId);
  };

  return (
    <div>
      <div className=" h-[12em] px-[10px] items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y lg:grid hidden">
        <div className="my-auto space-y-2">
          <h1 className="text-4xl text-center capitalize">WishList</h1>
          <h1 className="text-2xl  text-center   capitalize text-life-2">
            Your Shopping Wishlist{" "}
          </h1>
        </div>
      </div>

      <div className="container-page !px-0">
        <BreadCrumb menuData={["Wishlist"]} type="" />
        {wishlistItems.length > 0 ? (
          <div>
            <table className="w-full">
              <thead className="lg:table-header-group hidden">
                <tr className="border-b border-dashed">
                  <th className="px-6 py-3">
                    <Typography variant={"paragraph"} size={"sm"}>
                      Product
                    </Typography>
                  </th>
                  <th className="px-6 py-3">
                    <Typography variant={"paragraph"} size={"sm"}>
                      Price
                    </Typography>
                  </th>
                  <th className="px-6 py-3">
                    <Typography variant={"paragraph"} size={"sm"}>
                      {" "}
                      Stock Status
                    </Typography>
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((pro_data: any) => (
                  <tr className="border-b border-dashed block lg:table-row w-full relative">
                    <td className="px-6 py-3 lg:table-cell block w-fit mx-auto">
                      <Link
                        className="lg:flex block lg:space-x-3 space-y-2 items-center "
                        href={`/product/${pro_data.slug}`}
                      >
                        <Image
                          src={pro_data.images.featured_image}
                          alt=""
                          className="lg:mx-0 mx-auto lg:h-[80px] lg:w-[80px] h-[150px] w-[150px]"
                          height={150}
                          width={150}
                        />
                        <Typography className="md:!text-left !text-center">
                          {pro_data.title}
                        </Typography>
                      </Link>
                    </td>
                    <td className="px-6 py-3 block lg:table-cell text-center">
                      <Typography
                        variant={"primary"}
                        alignment={"horizontalCenter"}
                      >
                        {currentCountryDetails.currency}{" "}
                        {pro_data.prices && pro_data.prices[0].price.offer_price
                          ? pro_data.prices[0].price.offer_price
                          : pro_data.price[0].regular_price}
                      </Typography>
                    </td>
                    <td className="px-6 py-3 block lg:table-cell text-center">
                      <Typography
                        alignment={"horizontalCenter"}
                        variant={"primary"}
                        whitespace={"nowrap"}
                        size={"sm"}
                      >
                        {pro_data.in_stock === 0 ? "In Stock" : "Out of Stock"}
                      </Typography>
                    </td>
                    <td className="px-6 py-3 block lg:table-cell text-center mx-auto w-fit">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Button
                          onClick={() => addToCart(pro_data.id)}
                          variant={"outline"}
                          className="group !text-sm"
                          rounded={"sm"}
                          iconLeft={
                            <Icon
                              type="addToCartIcon"
                              className="fill-blue-500 group-hover:fill-white mr-2 "
                            />
                          }
                        >
                          ADD TO CART
                        </Button>
                        <button
                          onClick={() => removeWishList(pro_data.id)}
                          className="absolute lg:static right-3 top-3"
                        >
                          <Icon
                            type="crossIcon"
                            className="text-slate-400"
                            sizes={"sm"}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center flex-col p-10 space-y-5">
            <Icon type="heartIcon" sizes={"xl"} className="text-gray-500" />
            <Typography
              variant={"paragraph"}
              alignment={"horizontalCenter"}
              size={"sm"}
            >
              No products added to wishlist
            </Typography>
            <Link  href={"/products"} className={cn(buttonVariants({size:"lg", rounded:"none"}), "px-12 mx-auto") }>
              GO SHOP
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
