import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlice";
import wishlistReducer from "../features/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
