// server.js
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log("Mongo connected")
);

app.listen(3000, () => console.log("Server running"));
