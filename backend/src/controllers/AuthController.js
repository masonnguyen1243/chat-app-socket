import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "All fields are required!" });
    }

    if (password.length < 8) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        success: false,
        message:
          "Password must include at least 1 letter, a number, and at least 8 characters.",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verifyToken: uuidv4(),
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: newUser });
  } catch (error) {
    console.error(`Error in login controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
