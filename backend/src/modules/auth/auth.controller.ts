import type { Request, Response } from "express";
import { registerSchema } from "./auth.schema.js";
import { authRepository } from "./auth.repository.js";
import { authService } from "./auth.service.js";

export const authController = {
    register: async (req: Request, res: Response) => {
        const dataUser = registerSchema.parse(req.body)
        const userExists = await authRepository.findByEmail(dataUser.email)
        
        if (userExists) {
            return res.status(409).json({ error: "email alredy exists" });
        }

        if (!userExists) {
            await authService.registerUser(dataUser)
            return res.status(201).json({ message: "User created successfully", data: {}})
        }
    }
}