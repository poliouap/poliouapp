import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
  avatarUrl: z.string().url("URL de avatar inválida").nullable().or(z.literal("")).optional(),
  themePreference: z.enum(["light", "dark", "system"], {
    message: "Tema deve ser 'light', 'dark' ou 'system'",
  }).optional(),
});

