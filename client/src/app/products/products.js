import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getSingleProducts } from "./productionActions";

export const productSlices = createSlice({
  name: "products",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(getSingleProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsDetials = action.payload;
      })
      .addCase(getSingleProducts.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default productSlices.reducer;
