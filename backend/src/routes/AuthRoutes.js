import express from "express";
import {
  login,
  loginWithGoogle,
  logout,
  register,
  verifyAccount,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/verify-account", verifyAccount);

router.post("/google", loginWithGoogle);

router.delete("/logout", logout);

export default router;
