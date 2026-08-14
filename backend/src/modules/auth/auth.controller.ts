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
        // Envia os tokens via HttpOnly Cookies para maior segurança (evita XSS)
        const isProduction = process.env.NODE_ENV === "production";
        
        res.cookie("accessToken", tokens.accessToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax", // Ou "none" se o frontend e backend estiverem em domínios diferentes
          maxAge: 15 * 60 * 1000, // 15 minutos
          path: "/", // Garante que o cookie valha para o domínio todo
        });

        res.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
          path: "/",
        });

        console.log("Cookies set: ", tokens.accessToken ? "Yes" : "No");

        return res.status(200).json(new ApiResponse({
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

  refresh: async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new AppError("Refresh token não fornecido", 401);
    }

    try {
      const result = await authService.refreshSession(refreshToken);
      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutos
        path: "/",
      });

      return res.status(200).json(
        new ApiResponse(
          {
            user: result.user,
          },
          "Token renovado com sucesso"
        )
      );
    } catch (error: any) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new AppError(error.message || "Sessão expirada", 401);
    }
  },

  logout: async (req: Request, res: Response) => {
    // Agora o refreshToken vem do cookie HttpOnly de forma automática
    const refreshToken = req.cookies?.refreshToken;
    
    if (refreshToken) {
      await authService.logoutUser(refreshToken);
    }

    // Apaga os cookies blindados
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

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


