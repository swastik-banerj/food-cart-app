import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or any Vercel subdomain
    if (!origin || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import { protectRoute } from "../src/middleware/protect.middleware.js";

app.use("/api/auth", userRouter);
app.use("/api/cart", protectRoute, cartRouter);


export default app;


