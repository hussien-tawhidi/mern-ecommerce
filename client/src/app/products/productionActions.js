import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all products
// -------------------------------------------------
export const getProducts = createAsyncThunk(
  "get/all/products",
  async (product, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products/all"
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// get single products
// -------------------------------------------------
export const getSingleProducts = createAsyncThunk(
  "get/single/products",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/single/${id}`
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
