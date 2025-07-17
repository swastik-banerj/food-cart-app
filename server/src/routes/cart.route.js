import { Router } from "express";
import { addItemToCart, clearCart } from "../controllers/foodCart.controller.js";

const cartRouter = Router();

cartRouter.route("/save").post(addItemToCart);
cartRouter.route("/clearCart").post(clearCart);

export default cartRouter;
