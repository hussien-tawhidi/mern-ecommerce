import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import { validateMongodbId } from "../utils/validMongoDBId.js";

//GET ALL PRODUCTS
// --------------------------------
export const getAllProduct =asyncHandler( async (req, res) => {
  try {
    const products = await Product.find({});
    if (products) res.json(products);
  } catch (error) {
    throw new Error("Product has not found");
  }
});

// GET SINGLE PRODUCT
// --------------------------------
export const getSinglePeoduct = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbId(id);
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json("Product has not found");
    }
  } catch (error) {
    res.json(error);
  }
});
