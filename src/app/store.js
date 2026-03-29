import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import branchReducer from "../features/branchSlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    branches: branchReducer,
    products: productReducer,
    cart: cartReducer,
  },
});