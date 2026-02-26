import type { Request, Response, NextFunction } from "express";
import type { IAuth } from "./auth.modules.js";
import jwt from "jsonwebtoken";

declare global {

    namespace Express {
        interface Request {
            user?: IAuth;
        }
    }
};

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){

        return res.status(401).json({message: "Unauthorized"});
    };

    jwt.verify(token, JWT_SECRET, (error, user) => {

        if(error){

            return res.status(403).json({message: "Forbidden"});
        };

        req.user = user as IAuth;
        next();
    });
};