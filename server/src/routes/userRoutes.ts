import express from "express";
import {userController} from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginController);

userRouter.post("/logout",userController.logoutController)

export default userRouter;
