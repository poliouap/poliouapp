import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Lê o token do cookie (HttpOnly) ou usa o header como fallback
  let token = req.cookies?.accessToken;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }
  }

  if (!token) {
    throw new AppError("Token não fornecido", 401);
  }

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
