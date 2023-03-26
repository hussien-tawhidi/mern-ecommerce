import express from "express";
import {
  addOrderItems,
  getOrder,
  getOrders,
  updateOrderPaid,
} from "../controllers/orderCtrl.js";
import { protect } from "../middlewares/authMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.post("/create", protect, addOrderItems);
orderRoutes.get("/:id", protect, getOrder);
orderRoutes.get("/",  getOrders);
orderRoutes.put("/:id/pay", protect, updateOrderPaid);

export default orderRoutes;
