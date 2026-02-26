import type { Express } from "express";
import express from "express";
import cors from "cors";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import addressRouter from "./modules/address/address.routes.js";
import roadRouter from "./modules/road/road.routes.js";
import geminiRouter from "./modules/gemini/gemini.routes.js";
import relationRouter from "./modules/relation/relation.routes.js";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/relation", relationRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/gemini", geminiRouter);
app.use("/address", addressRouter);
app.use("/roads", roadRouter);

export default app;