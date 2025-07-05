import mongoose from "mongoose";
import { ENV } from "./environments.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Connection failed ${error}`);
  }
};
