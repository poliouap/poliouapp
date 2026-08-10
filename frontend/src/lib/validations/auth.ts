import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "O e-mail é obrigatório").email("Insira um formato de e-mail válido"),
  password: z.string().min(1, "A senha é obrigatória"),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
  email: z.string().min(1, "O e-mail é obrigatório").email("Insira um formato de e-mail válido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export type RegisterInput = z.infer<typeof registerSchema>
