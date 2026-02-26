import jwt from "jsonwebtoken";
import type { ILoggedUser, IUser } from "../user/user.module.js";
import { UserService } from "../user/user.service.js";
import type { IAuth } from "./auth.modules.js";
import bcrypt from "bcrypt";

export class AuthService {

    private userService: UserService;
    
    constructor(userService: UserService){
        
        this.userService = userService;
    };
    
    async authenticate(email: string): Promise<ILoggedUser | null>{
        
        const JWT_SECRET: string = process.env.JWT_SECRET || "";
        const user: ILoggedUser | null = await this.userService.getUserByEmail(email);
        
        if(!user){

            return null;
        };

        // const passwordValidation = await bcrypt.compare(password, user.password);

        // if(!passwordValidation){

        //     return null;
        // };

        // const payload: IAuth = {

        //     id: user.id,
        //     email: user.email
        // };

        // const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
        return user;
    }; 
};