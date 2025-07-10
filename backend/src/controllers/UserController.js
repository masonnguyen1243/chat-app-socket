import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { CloudinaryProvider } from "../utils/CloudinaryUpload.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    return res.status(StatusCodes.OK).json({ success: true, data: user });
  } catch (error) {
    console.error(`Error in getUser controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
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

export const changeAvatar = async (req, res) => {
  try {
    const avatar = req.file;
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    const uploadResult = await CloudinaryProvider.streamUpload(
      avatar?.buffer,
      "CHAT_APP_SOCKET_USER_AVATAR"
    );

    const updatedUser = await User.findOneAndUpdate(
      user._id,
      { avatar: uploadResult.secure_url },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Avatar updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error(`Error in changeAvatar controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
