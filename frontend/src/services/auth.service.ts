import { fetchApi, ApiError } from "@/lib/api"
import type { LoginInput, RegisterInput } from "@/lib/validations/auth"

export interface User {
  id: string
  name: string
  email: string,
  isPremium: boolean,
  theme: string,
  // outros campos que o seu backend possa retornar (ex: role, createdAt, etc)
}

export interface LoginResponse {
  message: string
  accessToken: string
  refreshToken?: string
  user: User
}

export interface RegisterResponse {
  message: string
  data: User
}

export const authService = {
  /**
   * Realiza o login do usuário na API
   * POST /auth/login
   */
  async login(data: LoginInput): Promise<LoginResponse> {
    return fetchApi<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Registra um novo usuário na API
   * POST /api/auth/register
   */
  async register(data: RegisterInput): Promise<RegisterResponse> {
    return fetchApi<RegisterResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}
