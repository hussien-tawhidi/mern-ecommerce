import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors"
import userRoutes from "./routes/user.js"

dotenv.config();
const app = express();
app.use(cors());

// user route
// ---------------------------
app.use("/",userRoutes)
// ---------------------------

app.listen(process.env.PORT || 8000, () => {
    console.log(`server has runing on => PORT${8000}`.blue);
})