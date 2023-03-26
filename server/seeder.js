import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "colors";
import { userData } from "./user.js";
import { products } from "./data.js";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";
import { connectionDB } from "./utils/myDb.js";

dotenv.config();
connectionDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUser = await User.insertMany(userData);

    const admineUser = createdUser[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: admineUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("data imporated");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("data destroied");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// for import all data
// node seeder.js
// ----------------------------------------------------

// for destroy all data
// node seeder.js -d
// ----------------------------------------------------
