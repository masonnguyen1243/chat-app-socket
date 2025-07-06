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
