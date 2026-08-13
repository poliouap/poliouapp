import type { z } from "zod";
import { userRepository } from "./user.repository.js";
import type { updateProfileSchema } from "./user.schema.js";

export const userService = {
  getProfile: async (userId: string) => {
    return userRepository.findById(userId);
  },

  updateProfile: async (
    userId: string,
    profileData: z.infer<typeof updateProfileSchema>
  ) => {
    return userRepository.updateProfile(userId, profileData);
  },

  uploadAvatar: async (userId: string, file: Express.Multer.File) => {
    const { supabase } = await import("../../core/config/supabase.js");
    
    // 1. Busca o usuário para ver se ele já tem uma foto antiga
    const user = await userRepository.findById(userId);
    
    if (user?.avatarUrl) {
      // Extrai o nome do arquivo da URL antiga (ex: "https://.../avatars/123-17123.jpg" -> "123-17123.jpg")
      const oldFileName = user.avatarUrl.split("/").pop();
      
      if (oldFileName) {
        // 2. Deleta a foto antiga do storage
        await supabase.storage.from("avatars").remove([oldFileName]);
      }
    }

    // 3. Prepara o nome do novo arquivo (nome único para evitar cache no navegador)
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExtension}`;

    // 4. Faz o upload da nova foto
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return userRepository.updateProfile(userId, { avatarUrl: publicUrl });
  },
};
