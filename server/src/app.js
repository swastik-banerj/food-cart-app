import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: "food-cart-mld0gz7n2-swastik-banerjs-projects.vercel.app",
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


