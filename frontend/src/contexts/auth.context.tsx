"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { authService, User } from "@/services/auth.service"
import type { LoginInput } from "@/lib/validations/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (data: LoginInput) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Ao iniciar o app, verifica se tem cookie e busca os dados do usuário do backend
    async function loadUserFromToken() {
      const token = Cookies.get("poliouapp.token")
      
      if (token) {
        try {
          const res = await authService.getMe()
          if (res.success && res.data) {
            setUser(res.data.user)
          }
        } catch (error) {
          // Token inválido ou expirado
          Cookies.remove("poliouapp.token")
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    loadUserFromToken()
  }, [])

  async function signIn(data: LoginInput) {
    const res = await authService.login(data)
    
    if (res.success && res.data) {
      // Salva o token no Cookie
      Cookies.set("poliouapp.token", res.data.accessToken, {
        expires: 7, // 7 dias
        path: "/",
      })

      // Salva o usuário no estado local
      setUser(res.data.user)

      // Redireciona para o dashboard de forma nativa e sem piscar tela
      router.push("/dashboard")
    }
  }

  function logout() {
    Cookies.remove("poliouapp.token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
