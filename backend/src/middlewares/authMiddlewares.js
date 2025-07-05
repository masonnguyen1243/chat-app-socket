import jwt from "jsonwebtoken";
import { ENV } from "../config/environments.js";
import { StatusCodes } from "http-status-codes";

export const verifyToken = async (req, res, next) => {
  const clientAccessToken = req.cookies?.accessToken;
  console.log("🚀 ~ verifyToken ~ clientAccessToken:", clientAccessToken);

  if (!clientAccessToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Invalid Token" });
  }

  try {
    if (!ENV.JWT_ACCESS_SECRET_KEY) {
      console.error("JWT Secret Key is not defined.");
      return res.status(StatusCodes.GONE).json({
        success: false,
        message: "Server configuration error: JWT secret key missing.",
      });
    }
    const decoded = jwt.decode(clientAccessToken, ENV.JWT_ACCESS_SECRET_KEY);

    req.user = decoded;
    console.log(req.user);

    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token expired" });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.userRole === "admin") {
    next();
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ succcess: false, message: "REQUIRE ADMIN ROLE!" });
  }
};
