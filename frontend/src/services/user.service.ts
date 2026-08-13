import { fetchApi } from "@/lib/api"
import type { ApiResponse, User } from "./auth.service"

export const userService = {
  /**
   * Atualiza o perfil do usuário (nome e tema)
   * PUT /api/users/profile
   */
  async updateProfile(data: { name?: string; themePreference?: string }): Promise<ApiResponse<{ user: User }>> {
    return fetchApi<ApiResponse<{ user: User }>>("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  /**
   * Faz o upload da foto de perfil
   * POST /api/users/profile/avatar
   */
  async uploadAvatar(file: File): Promise<ApiResponse<{ user: User }>> {
    const formData = new FormData()
    formData.append("avatar", file)

    return fetchApi<ApiResponse<{ user: User }>>("/api/users/profile/avatar", {
      method: "POST",
      body: formData,
      // Não definimos Content-Type aqui para que o navegador configure o multipart/form-data com o boundary correto!
      headers: {
        // "Content-Type": undefined // Isso fará o fetchApi ignorar o default
      },
    })
  }
}
