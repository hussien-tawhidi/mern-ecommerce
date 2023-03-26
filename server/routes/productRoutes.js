import express from "express";
import {
  getAllProduct,
  getSinglePeoduct,
} from "../controllers/productsCtrl.js";

const productRoutes = express.Router();

productRoutes.get("/all", getAllProduct);
productRoutes.get("/single/:id", getSinglePeoduct);

export default productRoutes;
