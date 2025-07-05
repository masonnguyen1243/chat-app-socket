import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./config/environments.js";
import fileUpload from "express-fileupload";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV.PORT;

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

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);

connectDB();

app.get("/status", (req, res) => {
  res.send("Server is OK!");
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
