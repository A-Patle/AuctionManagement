import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../slices/playerSlice";
import cartSlice from "../slices/cartSlice";
import franchiseSlice from "../slices/franchiseSlice";

const store = configureStore({
  reducer: {
    players: playerSlice,
    cart: cartSlice,
    franchise: franchiseSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
