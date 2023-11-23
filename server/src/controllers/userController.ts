import asyncHandler from "express-async-handler";
import { Request, Response } from "express"
import { userService } from "../services/userService.js"
import { createToken } from "../middlewares/token.js"
import { validate } from "../utils/validate.js"


const registerUser =asyncHandler (async (req: Request, res: Response) => {
    try {
        const reg = await userService.register(req.body)
        res.status(200).json(reg)
    } catch (err) {
        console.error(err);
        res.status(400).send(`${err}`);
    }
}
)


const validateLogin = async (email: string, password: string) => {
    const user  = await userService.getUserByEmailService(email);
    if (!user) {
        throw new Error("User not found");
    }
    const hash = user[0]
    const isPasswordValid = await userService.validatePasswordService(password, hash.password)
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    return user;
}

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //   validate
        const user = await validateLogin(email, password);
        //   create token
        const userEmail = req.body.email;
        const userAdmin = req.body.isAdmin
        const token = createToken(userEmail,userAdmin);
        return res.status(200).json({ token, user, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const userController = {
    registerUser,
    loginController
}

