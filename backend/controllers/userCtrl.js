import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

// CREATE USER
// --------------------------------
export const products = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
});
