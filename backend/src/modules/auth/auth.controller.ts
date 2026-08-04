import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authRepository } from "./auth.repository.js";
import { authService } from "./auth.service.js";

export const authController = {
  register: async (req: Request, res: Response) => {
    const dataUser = registerSchema.parse(req.body);
    const userExists = await authRepository.findByEmail(dataUser.email);

    if (userExists) {
      return res.status(409).json({ error: "email alredy exists" });
    }

    if (!userExists) {
      await authService.registerUser(dataUser);
      return res
        .status(201)
        .json({ message: "User created successfully", data: {} });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const dataUser = loginSchema.parse(req.body);
      const tokens = await authService.loginUser(dataUser);

      if (tokens) {
        return res.status(200).json({
          message: "Login successful",
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: tokens.user,
        });
      }
    } catch (error: any) {
      if (error.message === "Credenciais inválidas") {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }
      return res
        .status(400)
        .json({ error: "Dados inválidos no formulário", details: error });
    }
  },
};
