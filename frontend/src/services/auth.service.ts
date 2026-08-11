import { fetchApi } from "@/lib/api"
import type { LoginInput, RegisterInput } from "@/lib/validations/auth"

export interface User {
  id: string
  name: string
  email: string
}

// O novo padrão da sua API do Backend
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export interface LoginData {
  accessToken: string
  refreshToken?: string
  user: User
}

export const authService = {
  /**
   * Realiza o login do usuário na API
   * POST /api/auth/login
   */
  async login(data: LoginInput): Promise<ApiResponse<LoginData>> {
    return fetchApi<ApiResponse<LoginData>>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Registra um novo usuário na API
   * POST /api/auth/register
   */
  async register(data: RegisterInput): Promise<ApiResponse<void>> {
    return fetchApi<ApiResponse<void>>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Busca os dados do usuário usando o Token que está nos Cookies
   * GET /api/auth/me
   */
  async getMe(): Promise<ApiResponse<{ user: User }>> {
    return fetchApi<ApiResponse<{ user: User }>>("/api/auth/me", {
      method: "GET",
    })
  }
}
