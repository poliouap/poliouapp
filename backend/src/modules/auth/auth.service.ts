import bcrypt from 'bcryptjs';
// Importe o schema do zod para extrairmos o tipo automaticamente!
import { z } from 'zod';
import jwt from 'jsonwebtoken'
import { loginSchema, registerSchema } from './auth.schema.js';
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
    },
    
    loginUser: async (loginData: z.infer<typeof loginSchema>) => {
        const user = await authRepository.findByEmail(loginData.email)

        if (!user) {
            throw new Error("Credenciais inválidas"); 
        }

        // Usamos 'await' porque comparar criptografia exige processamento pesado e tempo.
        // Sem o await, o Javascript passa reto e acha que a senha sempre está correta!
        const passwordIsValid = await bcrypt.compare(loginData.password, user.passwordHash);

        if (!passwordIsValid) {
            throw new Error("Credenciais inválidas"); 
        }

        const jwtPayload = { userId: user.id };

        const accessToken = jwt.sign(
            jwtPayload, 
            process.env.JWT_ACCESS_SECRET as string, 
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            jwtPayload, 
            process.env.JWT_REFRESH_SECRET as string, 
            { expiresIn: '7d' }
        );

        // A sessão do usuário vai expirar após 7 dias depois de logado
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7)


        await authRepository.createSession(user.id, refreshToken, expiresAt);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }
}