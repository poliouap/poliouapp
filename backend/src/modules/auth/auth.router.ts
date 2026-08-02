import { Router } from "express";
import { authController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authController.register);

export { authRouter };
