import type { Request, Response } from "express";
import type { AuthRequest } from "../../core/middlewares/auth.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authRepository } from "./auth.repository.js";
import { authService } from "./auth.service.js";
import { AppError } from "../../core/errors/AppError.js";
import { ApiResponse } from "../../core/utils/ApiResponse.js";

export const authController = {
  register: async (req: Request, res: Response) => {
    const dataUser = registerSchema.parse(req.body);
    const userExists = await authRepository.findByEmail(dataUser.email);

    if (userExists) {
      throw new AppError("email alredy exists", 409);
    }

    await authService.registerUser(dataUser);
    
    return res.status(201).json(new ApiResponse({}, "User created successfully"));
  },

  login: async (req: Request, res: Response) => {
    const dataUser = loginSchema.parse(req.body);
    
    try {
      const tokens = await authService.loginUser(dataUser);
      if (tokens) {
        return res.status(200).json(new ApiResponse({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: tokens.user,
        }, "Login successful"));
      }
    } catch (error: any) {
      if (error.message === "Credenciais inválidas") {
        throw new AppError("Credenciais inválidas", 401);
      }
      throw error;
    }
  },

  logout: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await authService.logoutUser(refreshToken);
    return res.status(200).json(new ApiResponse({}, "Logout realizado com sucesso"));
  },

  me: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
      throw new AppError("Usuário não identificado pelo token", 401);
    }

    const user = await authRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return res.status(200).json(new ApiResponse({ user }));
  },
};


