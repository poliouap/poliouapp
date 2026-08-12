import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, userController.getProfile);
userRouter.put("/profile", authMiddleware, userController.updateProfile);

export { userRouter };
