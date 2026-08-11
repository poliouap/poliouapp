import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Erros do Prisma, Zod ou Node
  console.error("[UNHANDLED ERROR]:", err);

  return res.status(500).json({
    success: false,
    error: "Erro interno do servidor",
  });
};
