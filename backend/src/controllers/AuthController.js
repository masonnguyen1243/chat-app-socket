import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "../config/environments.js";
import SendEmail from "../utils/SendEmail.js";

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
    console.error(`Error in login controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
