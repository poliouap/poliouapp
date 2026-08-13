import { Router } from "express";
import multer from "multer";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";

const userRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

userRouter.get("/profile", authMiddleware, userController.getProfile);
userRouter.put("/profile", authMiddleware, userController.updateProfile);
userRouter.post("/profile/avatar", authMiddleware, upload.single("avatar"), userController.uploadAvatar);

export { userRouter };
