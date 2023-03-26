import { createSlice } from "@reduxjs/toolkit";
import { createOrderAction, getOrderAction, getOrdersAction, updateOrderPaidAction } from "./orderActions";

export const orderSlices = createSlice({
  name: "order",
  initialState: {},
    extraReducers: (builder) => {
      builder
        .addCase(createOrderAction.pending, (state) => {
          state.loading = true;
          state.isOrdered=false
        })
        .addCase(createOrderAction.fulfilled, (state, action) => {
          state.isOrdered=true
          state.loading = false;
          state.orderInfo = action.payload;
        })
        .addCase(createOrderAction.rejected, (state, action) => {
          state.isOrdered=false
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
        })
        .addCase(getOrderAction.pending, (state) => {
          state.getOrderByIdLoading = true;
        })
        .addCase(getOrderAction.fulfilled, (state, action) => {
          state.getOrderByIdLoading = false;
          state.getOrder = action.payload;
        })
        .addCase(getOrderAction.rejected, (state, action) => {
          state.getOrderByIdLoading = false;
          state.GetAppErr = action?.payload?.message;
          state.GetServerErr = action?.error?.message;
        })
        .addCase(updateOrderPaidAction.pending, (state) => {
          state.updateOrderLoading = true;
        })
        .addCase(updateOrderPaidAction.fulfilled, (state, action) => {
          state.updateOrderLoading = false;
          state.updateOrder = action.payload;
        })
        .addCase(updateOrderPaidAction.rejected, (state, action) => {
          state.updateOrderLoading = false;
          state.updateOrderAppErr = action?.payload?.message;
          state.updateOrderServerErr = action?.error?.message;
        })
        .addCase(getOrdersAction.pending, (state) => {
          state.updateOrderLoading = true;
        })
        .addCase(getOrdersAction.fulfilled, (state, action) => {
          state.updateOrderLoading = false;
          state.orders = action.payload;
        })
        .addCase(getOrdersAction.rejected, (state, action) => {
          state.updateOrderLoading = false;
          state.updateOrderAppErr = action?.payload?.message;
          state.updateOrderServerErr = action?.error?.message;
        });
  },
});

export default orderSlices.reducer;
