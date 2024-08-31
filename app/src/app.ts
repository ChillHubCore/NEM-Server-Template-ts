import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { limiter } from "./middlewares/limiter";
import cors from "./middlewares/cors";
import userRouter from "./routes/user.routes";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
console.log(mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => res.send("Running!"));

app.use(limiter);
app.use(cors);

app.use("/user", userRouter);

export default app;
