import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validMongoDBId.js";
import userModel from "../model/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import User from "../model/userModel.js";

// login and auth user
// ----------------------------------
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.matchPassword(password))) {
    res.status(200).json({
      _id: userFound?._id,
      name: userFound?.name,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("invalid  email or password _ ");
  }
});

// register user
// ----------------------------------
export const userRegister = asyncHandler(async (req, res) => {
  const useExist = await User.findOne({ email: req.body.email });
  if (useExist) throw new Error("user already exist _ ");

  try {
    const user = await User.create({
      name: req?.body?.name,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

// user profile
// ----------------------------------
export const getUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req?.params;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (user) {
    res.json({
      _id: user?._id,
      name: user?.name,
      password: user?.password,
      email: user?.email,
      isAdmin: user?.isAdmin,
    });
  } else {
    res.status(404).json("user not found");
  }
});

//update user profile
// ----------------------------------
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req?.params;

  validateMongodbId(id);

  const user = await User.findById(id);
  if (user) {
    user.name = req?.body?.name || user?.name;
    user.email = req?.body?.email || user?.email;
    if (req?.body?.password) {
      user.password = req?.body?.password || user?.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser?._id,
      name: updatedUser?.name,
      email: updatedUser?.email,
      isAdmin: updatedUser?.isAdmin,
      token: generateToken(updatedUser?._id),
    });
  } else {
    res.status(404).json("user not found");
  }
});
