import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    return res.status(StatusCodes.OK).json({ success: false, data: user });
  } catch (error) {
    console.error(`Error in getUser controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (!users) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Users not found" });
    }

    return res.status(StatusCodes.OK).json({ success: false, data: users });
  } catch (error) {
    console.error(`Error in getUsers controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { password, username } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isActive) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Your account is not active" });
    }

    if (id !== userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You are not allowed to update this user",
      });
    }

    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    if (user) {
      user.username = username || user.username;
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error(`Error in updateUser controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
