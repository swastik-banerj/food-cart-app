import { Router } from "express";
import { addItemToCart, clearCart, decreaseItemOty, deleteItem, increaseItemOty } from "../controllers/foodCart.controller.js";

const cartRouter = Router();

cartRouter.route("/save").post(addItemToCart);
cartRouter.route("/clearCart").post(clearCart);
cartRouter.route("/deleteItem/:itemName").post(deleteItem);
cartRouter.route("/item/:itemName/inc").put(increaseItemOty);
cartRouter.route("/item/:itemName/dec").put(decreaseItemOty);

export default cartRouter;
