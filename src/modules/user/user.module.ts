import type { IRoad } from "../road/road.module.js";

export interface IUser {

    id: number;
    name: string;
    email: string;
    password: string;
};

export interface ILoggedUser {

    id: number;
    name: string;
    email: string;
    password: string;
    roads: IRoad[];
};

export interface ICreateUser {

    name: string;
    email: string;
    password: string;
};

export interface IUpdateUser {

    name?: string;
    email?: string;
    password?: string;
}