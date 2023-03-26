import express from "express";
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  userRegister,
} from "../controllers/usersCtrl.js";
import { protect } from "../middlewares/authMiddleware.js";
const userRoutes = express.Router();

userRoutes.post("/login", authUser);
userRoutes.get("/profile/:id", getUserProfile);
userRoutes.post("/register", userRegister);
userRoutes.put("/update-profile/:id", protect, updateUserProfile);

export default userRoutes;
