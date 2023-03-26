import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";


export const protect = asyncHandler(async (req, res, next) => {
   let token;
   if (req?.headers?.authorization?.startsWith("Bearer")) {
     try {
       token = req.headers.authorization.split(" ")[1];
       if (token) {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded?._id).select("-password");
         req.user = user;
         next();
       }
     } catch (error) {
       throw new Error("not authorized , try login again");
     }
   } else {
     throw new Error("not token found");
   }
});
