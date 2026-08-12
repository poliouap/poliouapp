import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, "invalid name"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "invalid password")
  // adicionar confirmPassword
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
