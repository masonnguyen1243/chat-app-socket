import express from "express";
import { getUser, getUsers } from "../controllers/UserController.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/getUser", verifyToken, getUser);

router.get("/getUsers", verifyToken, isAdmin, getUsers);

export default router;
