import { Router } from "express";
import { authController } from "./auth.controller.js";
import { loginRateLimiter } from "../../core/middlewares/rateLimit.middleware.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", loginRateLimiter, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", authMiddleware as any, authController.me as any);

export { authRouter };
