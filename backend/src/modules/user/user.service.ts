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
};
