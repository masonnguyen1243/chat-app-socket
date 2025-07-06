import express from "express";
import { getUser } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/getUser", verifyToken, getUser);

export default router;
