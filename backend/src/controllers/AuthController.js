import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "../config/environments.js";
import SendEmail from "../utils/SendEmail.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/GenerateToken.js";
import ms from "ms";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "All fields are required!" });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        success: false,
        message: "Invalid email format.",
      });
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

    //Send Email
    const verificationLink = `${ENV.FRONTEND_URL}/account/verification?email=${newUser.email}&token=${newUser.verifyToken}`;
    const customSubject = "Please verify your email before using our service";
    const htmlContent = `
      <h3>Here is your verification link</h3>
      <h3>${verificationLink}</h3>
      <h3>Sincerely, <br/> - Chat app - </h3>
    `;

    await SendEmail(newUser.email, customSubject, htmlContent);

    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: newUser });
  } catch (error) {
    console.error(`Error in register controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Account not found" });
    }

    if (!user.isActive) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, message: "Your account is not active" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    const cookieOptions = {
      httpOnly: true,
      secure: ENV.NODE_ENV !== "development" ? true : false,
      sameSite: "strict",
      maxAge: ms("7 days"),
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged in successfully!",
      data: { user, accessToken, refreshToken },
    });
  } catch (error) {
    console.error(`Error in login controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { email, token } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    if (user.isActive) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Your account already active! Please login!",
      });
    }

    if (token !== user.verifyToken) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, message: "Invalid Token" });
    }

    user.isActive = true;
    user.verifyToken = null;

    await user.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Verification successfully! Please login!",
    });
  } catch (error) {
    console.error(`Error in verifyAccount controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
