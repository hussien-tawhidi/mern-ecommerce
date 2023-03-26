import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user login
// -----------------------------------
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/login`,
        user,
        config
      );
      // save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// register user
// -----------------------------------
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/register`,
        user,
        config
      );
      // save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// user logout
// -----------------------------------
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // save user to local storage
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// user profile
// -----------------------------------
export const userProfileAction = createAsyncThunk(
  "users/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userInfo = getState()?.user;
    const { userAuth } = userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/profile/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update user
export const isUpdate = createAsyncThunk(
  "user/isUpdates",
  (id, { rejectWithValue, getState, dispatch }) => {}
);
// update user
// -----------------------
export const userUpadteProfileAction = createAsyncThunk(
  "user/update-profile",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/update-profile/${userAuth?.id}`,
        {
          name: userData?.name,
          email: userData?.email,
        },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);




