import { configureStore } from "@reduxjs/toolkit";
import productSlices from "./products/products";
import cart from "./cart/cart";
import user from "./userAuth/user";
import order from "./order/order";

export const store = configureStore({
  reducer: {
    products: productSlices,
    cart,
    user,
    order
  },
});
