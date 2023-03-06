import express from "express";
import { products } from "../controllers/userCtrl.js";

const productRoutes = express.Router();

productRoutes.get("/", products);

export default productRoutes;
