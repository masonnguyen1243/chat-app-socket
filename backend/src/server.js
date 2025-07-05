import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./config/environments.js";
import { connectDB } from "./config/db.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [ENV.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDB();

app.get("/status", (req, res) => {
  res.send("Server is OK!");
});

app.listen(3000, () => {
  console.log(`Server is running on: http://localhost:3000`);
});
