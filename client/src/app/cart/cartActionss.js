import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} from "./cart";

export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/single/${id}`
    );
    const itemToAdd = {
      id: data?._id,
      name: data?.name,
      image: data?.image,
      price: Number(data?.price),
      brand: data?.brand,
      category: data?.category,
      description: data?.description,
      rating: data?.rating,
      numReviews: data?.numReviews,
      countInStock: data?.countInStock,
      createdAt: data?.createdAt,
      qty,
    };
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
};

export const setExpress = (value) => async (dispatch) => {
  dispatch(setExpressShipping(value));
};

export const resetCart = () => (dispatch) => {
  dispatch(clearCart());
};

export const saveShippingAddress = createAsyncThunk(
  "save-shipping",
  async (shippingAdd, { rejectWithValue, getState, dispatch }) => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAdd));
    return shippingAdd;
  }
);

export const paymentMethod = createAsyncThunk(
  "payment-method",
  async (paymentM, { rejectWithValue, getState, dispatch }) => {
    localStorage.setItem("payment", JSON.stringify(paymentM));
    return paymentM;    

  }
);