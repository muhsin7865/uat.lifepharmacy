import { useDispatch, useSelector } from "react-redux";
import createCartPOSTReq from "@/lib/createCart";
import { addWishListData, updateCartData } from "@/redux/cart.slice";
import { RootState } from "../redux/store";
import updateCartApiReq from "@/lib/updateCart";
import { useModal } from "@/components/ui/modalcontext";
import { toast } from "@/components/ui/toast";
import { useLanguage } from "./useLanguage";
import { useSession } from "next-auth/react";

export function useCartActions() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart);
  const { getLatLngData } = useLanguage();
  const { data: session } = useSession();

  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];

  const cartId = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.cart_id
    : null;

  const wishListData = cartItems.wishlist.data;

  const { setOrderSucessSheetState, setLoadingState, currentLocation } =
    useModal();

  const createCart = (payloadData: any) => {
    if (cartItemsData.length > 0) {
      updateCart(payloadData);
    } else {
      payloadData.data.items[0].qty > 0 ? setOrderSucessSheetState(true) : null;
      createCartPOSTReq(payloadData).then((res) => {
        if (!res.success) {
          debugger;
          toast({
            title: "Error",
            message: `${res.message}`,
            type: "error",
          });
        } else {
          dispatch(updateCartData(res));
          setLoadingState("loadingDone");
          toast({
            title: "Success",
            message: "Updated Cart Details",
            type: "success",
          });
        }
      });
    }
  };

  const updateCart = (payloadData: any) => {
    payloadData.action = "update_items";
    payloadData.data.items[0].qty > 0 ? setOrderSucessSheetState(true) : null;
    updateCartApiReq(payloadData, cartId).then((res) => {
      if (!res.success) {
        debugger;

        toast({
          title: "Error",
          message: `${res.message}`,
          type: "error",
        });
      } else {
        dispatch(updateCartData(res));
        setLoadingState("loadingDone");
        toast({
          title: "Success",
          message: "Updated Cart Details",
          type: "success",
        });
      }
    });
  };

  const addWishList = (payloadData: any) => {
    debugger;
    const updatedWishList = [...wishListData, ...payloadData];
    dispatch(addWishListData(updatedWishList));
    toast({
      title: "Success",
      message: "Item added to Wishlist",
      type: "success",
    });
  };

  const removeWishList = (proId: string) => {
    debugger;
    const updatedWishList = wishListData.filter(
      (proDetails: any) => proDetails.id !== proId
    );
    dispatch(addWishListData(updatedWishList));

    toast({
      title: "Success",
      message: "Item removed from Wishlist",
      type: "success",
    });
  };

  const updateDeliverySlot = (payloadData: any, cartId: string) => {
    debugger;

    let requestOptions = {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${session?.token.token}`
        "Content-Type": "application/json",
        Latitude: getLatLngData()[0],
        Longitude: getLatLngData()[1],
      },
      body: JSON.stringify(payloadData),
    };
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}com/api/carts/v2/${cartId}/update?lang=ae-en`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        debugger;
        dispatch(updateCartData(res));
      });
  };

  const applyCoupon = (
    payloadData: any,
    cartId: string,
    setInvalidModalState: any,
    setAlertMessage: any
  ) => {

    const {locale} = useLanguage()

    debugger;
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Latitude: getLatLngData()[0],
        Longitude: getLatLngData()[1],
        Authorization: `Bearer ${session?.token.token}`,
      },
      body: JSON.stringify(payloadData),
    };
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/carts/v2/${cartId}/update?lang=${locale}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          dispatch(updateCartData(res));
          setInvalidModalState(true);
          setAlertMessage(res.data.messages.alerts.sub_title);
        } else {
          setInvalidModalState(true);
          setAlertMessage(res.message);
        }
      });
  };

  return {
    createCart,
    updateCart,
    addWishList,
    removeWishList,
    updateDeliverySlot,
    applyCoupon,
  };
}
