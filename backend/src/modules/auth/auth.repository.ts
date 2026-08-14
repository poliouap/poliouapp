import prisma from "../../core/config/prisma.js";

export const authRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        themePreference: true,
        isPremium: true
      }
    });
  },

  createUser: async (data: {
    name: string;
    email: string;
    passwordHash: string;
  }) => {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
      },
    });
  },

  createSession: async (
    userId: string,
    refreshToken: string,
    expiresAt: Date,
  ) => {
    return prisma.session.create({
      data: {
        userId,
        refreshToken,
        expiresAt,
      },
    });
  },

  findSessionByToken: async (refreshToken: string) => {
    return prisma.session.findUnique({
      where: { refreshToken },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            themePreference: true,
            isPremium: true,
          },
        },
      },
    });
  },

  deleteSession: async (refreshToken: string) => {
    return prisma.session.delete({
      where: {
        refreshToken: refreshToken,
      },
    });
  },
};




