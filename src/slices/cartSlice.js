import { createSlice } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartReducers";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: cartReducer,
});

export const {addItemToCart, removeItemFromCart, updateItemQuantity, emptyCart} = cartSlice.actions;

export default cartSlice.reducer;
