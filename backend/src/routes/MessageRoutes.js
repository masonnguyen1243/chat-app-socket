import express from "express";
import { getMessages, sendMessage } from "../controllers/MessageController.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import { multerUploadVideoMiddleware } from "../middlewares/multerUploadVideoMiddleware.js";

const router = express.Router();

router.get("/getMessages/:id", verifyToken, getMessages);

router.post(
  "/send/:id",
  verifyToken,
  multerUploadVideoMiddleware.upload.single("media"),
  sendMessage
);

export default router;
