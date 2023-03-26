import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"
import asyncHandler from "express-async-handler";

dotenv.config();


export const connectionDB = asyncHandler(async () => {
  await mongoose
    .connect(process.env.MYDB)
    .then(console.log("DB Successfully connected".yellow))
    .catch((err) => {
      console.log(`Connection has failed _ ${err}`.red);
    });
});
