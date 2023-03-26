import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// create order
// -------------------------------------------------
export const createOrderAction = createAsyncThunk(
  "create/order",
  async (order, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/order/create`,
        order,
        // user,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// get single order
// -------------------------------------------------
export const getOrderAction = createAsyncThunk(
  "get/order/byID",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/order/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update order paid
// -------------------------------------------------
export const updateOrderPaidAction = createAsyncThunk(
  "update/order/paid",
  async (id,paymentResult, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/order/${id}/pay`,
        paymentResult,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// get orders
// -------------------------------------------------
export const getOrdersAction = createAsyncThunk(
  "get/order/paid",
  async (order, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/order`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);