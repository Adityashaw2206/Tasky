import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ Route imports
import userRouter from "./router/user.routes.js";
import taskRouter from "./router/task.router.js"; // ✅ Add this line

// ✅ Use routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter); // ✅ Add this line

export { app };
