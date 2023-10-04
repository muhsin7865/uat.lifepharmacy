import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// interface CartItem {
//   id: string;
//   qty: number;
//   // Add other properties of the item
// }
const storedCart =
  typeof window !== "undefined"
    ? window.localStorage.getItem("life-store")
    : false;

const init = {
  cart: {},
  wishlist: {
    data: [],
  },
};

const cartSlice = createSlice({
  name: "life-store",
  initialState: storedCart ? JSON.parse(storedCart) : init,
  reducers: {
    updateCartData: (state, action: PayloadAction<any>) => {
      debugger;

      state.cart = action.payload.data;
      localStorage.setItem("life-store", JSON.stringify(state));
    },

    addWishListData: (state, action: PayloadAction<any>) => {
      debugger;
      state.wishlist.data = [...action.payload]; 
      localStorage.setItem("life-store", JSON.stringify(state));
    }
  },
});

export const cartReducer = cartSlice.reducer;

export const { updateCartData, addWishListData } = cartSlice.actions;
