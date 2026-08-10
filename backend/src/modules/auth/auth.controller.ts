import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authRepository } from "./auth.repository.js";
import { authService } from "./auth.service.js";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const dataUser = registerSchema.parse(req.body);
      const userExists = await authRepository.findByEmail(dataUser.email);

      if (userExists) {
        return res.status(409).json({ error: "email alredy exists" });
      }

      await authService.registerUser(dataUser);
      return res
        .status(201)
        .json({ message: "User created successfully", data: {} });
    } catch (error: any) {
      console.error("[AUTH REGISTER ERROR]:", error);
      return res
        .status(400)
        .json({ error: "Erro ao tentar registrar o usuário", details: error.message || error });
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

  logout: async (req: Request, res: Response) => {
    try {
      // 1. Pega o token cegamente do corpo da requisição (pode ser undefined)
      const { refreshToken } = req.body;
      
      // 2. Manda para o Service (que tem a trava de segurança caso seja undefined)
      await authService.logoutUser(refreshToken);

      // 3. Se sobreviveu e o Prisma deletou, devolvemos sucesso!
      return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error: any) {
      // 4. Captura o "throw new Error" do Service ou qualquer erro do Prisma
      return res.status(400).json({ error: error.message });
    }
  },
};
