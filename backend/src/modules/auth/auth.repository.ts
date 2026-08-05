import prisma from "../../core/config/prisma.js";

export const authRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
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
};
