import jwt from "jsonwebtoken";
import { ENV } from "../config/environments.js";

export const generateAccessToken = (userId, userRole) => {
  try {
    const accessToken = jwt.sign(
      { userId, userRole },
      ENV.JWT_ACCESS_SECRET_KEY,
      { expiresIn: ENV.JWT_ACCESS_EXPIRE }
    );

    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

export const generateRefreshToken = (userId, userRole) => {
  try {
    const refreshToken = jwt.sign(
      { userId, userRole },
      ENV.JWT_REFRESH_SECRET_KEY,
      { expiresIn: ENV.JWT_REFRESH_EXPIRE }
    );

    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};
