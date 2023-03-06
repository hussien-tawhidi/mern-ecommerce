import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "get/products",
  async (product, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/products");
      console.log(data)
      return data
    } catch (error) {
       if (!error?.response) throw error;
       return rejectWithValue(error?.response?.data);
    }
  }
);
