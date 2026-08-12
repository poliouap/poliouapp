import prisma from "../../core/config/prisma.js";

export const userRepository = {
  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        themePreference: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  updateProfile: async (
    userId: string,
    data: {
      name?: string | undefined;
      avatarUrl?: string | null | undefined;
      themePreference?: string | undefined;
    }
  ) => {
    return prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl === "" ? null : data.avatarUrl }),
        ...(data.themePreference !== undefined && { themePreference: data.themePreference }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        themePreference: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
