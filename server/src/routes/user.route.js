import { Router } from "express";
import { SignInUser, SignUpUser } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.route("/signup").post(SignUpUser);
userRouter.route("/signin").post(SignInUser);


export default userRouter;
