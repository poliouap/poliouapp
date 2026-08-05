import { Router } from "express";
import { authController } from "./auth.controller.js";
import { loginRateLimiter } from "../../core/middlewares/rateLimit.middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", loginRateLimiter, authController.login);

export { authRouter };
