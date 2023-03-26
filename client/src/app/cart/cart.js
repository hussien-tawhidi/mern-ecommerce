import { createSlice } from "@reduxjs/toolkit";
import { paymentMethod, saveShippingAddress } from "./cartActionss";

const calculateSubtotal = (cartState) => {
  let result = 0;
  cartState.map((item) => (result += item.qty * item.price));
  return Number(result).toFixed(2);
};

export const initialState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  expressShipping: JSON.parse(localStorage.getItem("expressShipping")) ?? false,
  subtotal: localStorage.getItem("cartItems")
    ? calculateSubtotal(JSON.parse(localStorage.getItem("cartItems")))
    : 0,
};

const updateLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(cart)));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    cartItemAdd: (state, { payload }) => {
      const existingItem = state?.cart.find((item) => item?.id === payload?.id);

      if (existingItem) {
        state.cart = state?.cart.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.cart = [...state?.cart, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemRemoval: (state, { payload }) => {
      state.cart = [...state.cart].filter((item) => item.id !== payload);
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
      state.loading = false;
      state.error = null;
    },
    setExpressShipping: (state, { payload }) => {
      state.expressShipping = payload;
      localStorage.setItem("expressShipping", payload);
    },
    clearCart: (state) => {
      localStorage.removeItem("cartItems");
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveShippingAddress.pending, (state, action) => {
        state.saveShippingLoading = true;
      })
      .addCase(saveShippingAddress.fulfilled, (state, action) => {
        state.saveShippingLoading = false;
        state.shippingAddress = action?.payload;
      })
      .addCase(saveShippingAddress.rejected, (state, action) => {
        state.saveShippingLoading = false;
        state.shippingAddressAppErr = action?.payload?.message;
        state.shippingAddressServerErr = action?.error?.message;
      })
      .addCase(paymentMethod.pending, (state, action) => {
        state.paymentLoading = true;
      })
      .addCase(paymentMethod.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentMethod = action?.payload;
      })
      .addCase(paymentMethod.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentAppErr = action?.payload?.message;
        state.paymentServerErr = action?.error?.message;
      });
  },
});

export const {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
