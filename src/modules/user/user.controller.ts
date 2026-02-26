import type { ICreateUser, IUpdateUser, IUser } from "./user.module.js";
import { UserService } from "./user.service.js";
import type { Request, Response } from "express";
import { updateUserSchema, userSchema } from "./user.zod.js";
import bcrypt from "bcrypt";

export class UserController {


    private userService: UserService;

    constructor(userService: UserService) {

        this.userService = userService;
    };

    async getUsers(req: Request, res: Response): Promise<Response> {

        try {

            const data: IUser[] = await this.userService.getUsers();
            return res.status(200).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async getUser(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {

                return res.status(404).json({ message: "Id not received" });
            };

            const data: IUser | null = await this.userService.getUser(Number(id));
            return res.status(200).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async postUser(req: Request, res: Response): Promise<Response> {

        try {

            const user: ICreateUser = req.body;
            const validatedUser = userSchema.parse(user);
            // const hashPassword = await bcrypt.hash(user.password, 10);
            const existingUser = await this.userService.getUserByEmail(user.email);

            if (!validatedUser) {

                return res.status(404).json({ message: "Object structure not valid to sign" });
            };

            if (existingUser) {

                return res.status(409).json({ message: "Email already signed" });
            };

            // const newUser: ICreateUser = { ...user, password: hashPassword };
            const data: IUser = await this.userService.createUser(user);
            return res.status(201).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async putUser(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;
            const user: IUpdateUser = req.body;
            const validatedUser = updateUserSchema.parse(user);

            if (!id) {

                return res.status(404).json({ message: "Id not received" });

            } else if (!validatedUser) {

                return res.status(401).json({ message: "Object structure not valid to update" });
            };

            const data: IUser = await this.userService.updateUser(Number(id), user);
            return res.status(200).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message })
        };
    };

    async deleteUser(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {

                return res.status(404).json({ message: "Id not received" });
            };

            await this.userService.deleteUser(Number(id));
            return res.status(200).json({ message: "User deleted with sucess" });

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };
};