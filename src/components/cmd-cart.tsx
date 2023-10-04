import Image from "next/image";
import { useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { Icon } from "./ui/icons";
import { Button, buttonVariants } from "./ui/button";
import { Typography, typographyVariants } from "./ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "./ui/toast";
export function CommandDemo({
  cartItems,
  subTotal,
}: {
  cartItems: any;
  subTotal: any;
}) {
  return (
    <div>
      <div className="overflow-y-auto h-[17rem]">
        {cartItems.map((cartItem: any) => (
          <CartItem cartItem={cartItem} />
        ))}
      </div>
      <div className="py-3">
        <div
          className={cn(
            typographyVariants({ size: "sm" }),
            "flex justify-between text-black items-center"
          )}
        >
          <div className="">
            TOTAL{"  "} <span>(WITHOUT SHIPPING)</span>{" "}
          </div>
          AED {subTotal}
        </div>
      </div>
      <div className="flex justify-between text-white space-x-3 rtl:space-x-reverse">
        <Link
          href="/cart"
          className={
            " w-full " + buttonVariants({ variant: "default", rounded: "none" })
          }
        >
          CART
        </Link>
        <Link
          href="/checkout"
          className={
            " w-full " + buttonVariants({ variant: "outline", rounded: "none" })
          }
        >
          CHECK OUT
        </Link>
      </div>
    </div>
  );
}

const CartItem = ({ cartItem }: { cartItem: any }) => {
  const { updateCart } = useCartActions();

  const [timeOutRemoveFromCart, setimeOutRemoveFromCart] = useState<any>(null);
  const [cartLoadingState, setCartLoadingState] = useState<any>(null);
  const removedFromCart = () => {
    // toast({
    //   title: "Sucess",
    //   message: "Updated Cart Details",
    //   type: "success",
    // });
  };

  const cartInit: any = {
    action: "",
    data: {
      items: [
        // {
        //     id: "a6c1a3e7-caea-4845-94ca-a49de40f18c0",
        //     qty: 1
        // }
      ],
      address_id: null,
    },
  };

  const clearCartState = () => {
    cartInit.data.items = [];
    cartInit.action = "";
  };

  const deleteCartItem = () => {
    cartInit.data.items.push({ id: cartItem.id, qty: 0 });
    setCartLoadingState(true);
    removedFromCart();
    clearTimeout(timeOutRemoveFromCart);
    const timeout = setTimeout(() => {
      updateCart(cartInit);
      clearCartState();
      setTimeout(() => {
        setCartLoadingState(false);
      }, 2700);
    }, 500);
    setimeOutRemoveFromCart(timeout);
  };

  return (
    <div className={cn("relative shadow-sm p-3 flex space-x-3 items-center")}>
       <div>
       <Icon type="crossIcon" sizes={"xs"}   className="text-slate-500"     onClick={() => {
          deleteCartItem();
        }} />
   
       </div>
     
      <Image
        src={
          cartItem.featured_image
            ? cartItem.featured_image
            : "/images/default-product-image.png"
        }
        height={50}
        width={50}
        alt={cartItem.title}
        className="mr-2 max-w-[50px] max-h-[50px]"
      />
      <Typography lineClamp={"two"} size={"sm"} className="text-black">
        {cartItem.title}
      </Typography>

    </div>
  );
};

export default CartItem;
