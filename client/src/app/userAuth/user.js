import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserAction,
  logoutUserAction,
  registerUserAction,
  userProfileAction,
  userUpadteProfileAction,
} from "./userActions";

// get user info from localstorage
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const user = createSlice({
  name: "user",
  initialState: { userAuth: userLoginFromStorage },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state, action) => {
        state.loginLoading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.userAuth = action?.payload;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginAppErr = action?.payload?.message;
        state.loginServerErr = action?.error?.message;
      })
      .addCase(registerUserAction.pending, (state, action) => {
        state.registerLoading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.userAuth = action?.payload;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.registerLoading = false;
        state.rigisterAppErr = action?.payload?.message;
        state.registerServerErr = action?.error?.message;
      })
      .addCase(userProfileAction.pending, (state, action) => {
        state.profileLoading = true;
      })
      .addCase(userProfileAction.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action?.payload;
      })
      .addCase(userProfileAction.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileAppErr = action?.payload?.message;
        state.profileServerErr = action?.error?.message;
      })
      .addCase(logoutUserAction.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(logoutUserAction.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.userLogout = action?.payload;
      })
      .addCase(logoutUserAction.rejected, (state, action) => {
        state.profileLoading = false;
        state.logoutAppErr = action?.payload?.message;
        state.logoutServerErr = action?.error?.message;
      })
      .addCase(userUpadteProfileAction.pending, (state, action) => {
        state.updateProfileLoading = true;
        state.isUpdateProfile = false;
      })
      .addCase(userUpadteProfileAction.fulfilled, (state, action) => {
        state.isUpdateProfile = true;
        state.updateProfileLoading = false;
        state.userUpdate = action?.payload;
      })
      .addCase(userUpadteProfileAction.rejected, (state, action) => {
        state.isUpdateProfile = false;
        state.updateProfileLoading = false;
        state.updateProfileAppErr = action?.payload?.message;
        state.updateProfileServerErr = action?.error?.message;
      })
    ;
  },
});

export default user.reducer;
