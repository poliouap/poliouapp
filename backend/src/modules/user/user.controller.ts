import type { Response } from "express";
import type { AuthRequest } from "../../core/middlewares/auth.middleware.js";
import { userService } from "./user.service.js";
import { updateProfileSchema } from "./user.schema.js";
import { AppError } from "../../core/errors/AppError.js";
import { ApiResponse } from "../../core/utils/ApiResponse.js";

export const userController = {
  getProfile: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError("Usuário não identificado pelo token", 401);
    }

    const user = await userService.getProfile(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return res.status(200).json(new ApiResponse({ user }));
  },

  updateProfile: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError("Usuário não identificado pelo token", 401);
    }

    const profileData = updateProfileSchema.parse(req.body);
    const updatedUser = await userService.updateProfile(userId, profileData);

    return res.status(200).json(new ApiResponse({ user: updatedUser }, "Perfil atualizado com sucesso"));
  },
};
