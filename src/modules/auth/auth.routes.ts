import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { Router } from "express";
import { UserService } from "../user/user.service.js";

const authRouter: Router = Router();
const userService: UserService = new UserService();
const authService: AuthService = new AuthService(userService);
const authController: AuthController = new AuthController(authService);

authRouter.post("/login", authController.login.bind(authController));

export default authRouter;