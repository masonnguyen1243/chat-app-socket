import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/getUser", verifyToken, getUser);

router.get("/getUsers", verifyToken, isAdmin, getUsers);

router.put("/updateUser/:id", verifyToken, updateUser);

export default router;
