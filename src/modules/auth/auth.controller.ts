import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import type { ILoggedUser } from "../user/user.module.js";

export class AuthController {

    private authService: AuthService;

    constructor(authService: AuthService) {

        this.authService = authService;
    };

    async login(req: Request, res: Response): Promise<Response> {

        try {

            const { email, password } = req.body;
            // const token:  | null = await this.authService.authenticate(email, password);

            // if (!token) {

            //     return res.status(401).json({ message: "Email or password invalid" });
            // };

            const user: ILoggedUser | null = await this.authService.authenticate(email);
            return res.status(200).json(user);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };
};