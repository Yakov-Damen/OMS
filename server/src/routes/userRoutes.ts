import express from "express";
import {userController} from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginController);

userRouter.post("/logout",userController.logoutController)

userRouter.get("/",userController.getAllUsers)

userRouter.delete("/:user_id",userController.deleteUserById)

export default userRouter;
