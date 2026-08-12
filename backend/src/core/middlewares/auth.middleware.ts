import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não fornecido", 401);
  }

  const parts = authHeader.split(" ");
  
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError("Erro de formatação do token", 401);
  }

  const token: any = parts[1];

  try {
    const secret = process.env.JWT_ACCESS_SECRET || "";
    const decoded = jwt.verify(token, secret) as unknown as { userId: string };
    
    // Injeta o ID do usuário na requisição
    req.user = { id: decoded.userId };
    
    return next();
  } catch (error) {
    throw new AppError("Token inválido ou expirado", 401);
  }
};
