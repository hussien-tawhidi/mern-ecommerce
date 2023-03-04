import express from "express";
import { createUser } from "../controllers/userCtrl.js";

const router = express.Router();

router.get("/",validator,createUser);

export default router