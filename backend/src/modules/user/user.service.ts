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
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExtension}`;

    const { supabase } = await import("../../core/config/supabase.js");
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
