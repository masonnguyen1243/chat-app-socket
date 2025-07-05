import express from "express";
import {
  login,
  register,
  verifyAccount,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/verify-account", verifyAccount);

export default router;
