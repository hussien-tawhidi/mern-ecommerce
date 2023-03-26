import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validMongoDBId.js";
import Order from "../model/orderModel.js";

//CREATE ORDER
// --------------------------------
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user
  } = req?.body;

  if (orderItems && orderItems?.length === 0) {
    res.status(400).json("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});

//GET ORDER
// --------------------------------
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(200).json(error);
  }
});

//UPDATE PAID
// --------------------------------
export const updateOrderPaid = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  try {
    const order = await Order.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentMethod = {
        id: req?.body?.id,
        status: req?.body?.status,
        update_time: req?.body?.update_time,
        email_address: req?.body?.payer?.email_address,
      };

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(200).json(error);
  }
});

//GET ORDERS
// --------------------------------
export const getOrders = asyncHandler(async (req, res) => {

  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
    //  console.log(orders)
  } catch (error) {
    res.status(200).json(error);
  }
});
