import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

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
