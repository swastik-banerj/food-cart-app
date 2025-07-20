import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = [
    "https://food-cart-app-delta.vercel.app",
    "https://food-cart-b3s4fo3bj-swastik-banerjs-projects.vercel.app",
    "https://food-cart.vercel.app" 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
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


