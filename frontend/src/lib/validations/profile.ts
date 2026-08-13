import { z } from "zod"

export const updateProfileSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
  themePreference: z.enum(["light", "dark", "system"], {
    message: "Tema deve ser 'light', 'dark' ou 'system'",
  }).optional(),
})

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// A validação de arquivos no frontend usando Zod pode ser feita verificando a instância de File
export const avatarSchema = z.object({
  file: z.custom<File>((val) => val instanceof File, "A imagem é obrigatória.")
    .refine((file) => file.size <= MAX_FILE_SIZE, `O tamanho máximo permitido é de 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Formato inválido. Apenas .jpg, .png e .webp são suportados."
    ),
})
