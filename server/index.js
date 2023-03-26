import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import { connectionDB } from "./utils/myDb.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
connectionDB();
dotenv.config();
app.use(cors());
app.use(express.json());

//routes
// ---------------------------
app.use("/api/products", productRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/order", orderRoutes);
// ---------------------------
// middleware
// --------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server has runing on => PORT${5000}`.blue);
});
