import bcrypt from 'bcryptjs';
// Importe o schema do zod para extrairmos o tipo automaticamente!
import { z } from 'zod';
import { registerSchema } from './auth.schema.js';
import { authRepository } from './auth.repository.js';

type RegisterDTO = z.infer<typeof registerSchema>;

export const authService = {
    registerUser: async (userData: RegisterDTO ) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return authRepository.createUser({
            name: userData.name,
            email: userData.email,
            passwordHash: hashedPassword
        });
    }   
}