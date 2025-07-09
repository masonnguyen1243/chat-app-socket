import express from "express";
import {
  changeAvatar,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddlewares.js";
import { multerUploadMiddleware } from "../middlewares/multerUploadMiddleware.js";

const router = express.Router();

router.get("/getUser", verifyToken, getUser);

router.get("/getUsers", verifyToken, getUsers);

router.put("/updateUser/:id", verifyToken, updateUser);

router.put(
  "/changeAvatar",
  verifyToken,
  multerUploadMiddleware.upload.single("avatar"),
  changeAvatar
);

export default router;
