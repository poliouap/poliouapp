"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService, User } from "@/services/auth.service"
import type { LoginInput } from "@/lib/validations/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (data: LoginInput) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updatedData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ 
  children,
  initialUser 
}: { 
  children: ReactNode;
  initialUser: User | null;
}) {
  // Inicializa o estado diretamente com o usuário que o servidor Next.js mandou!
  // Zero "Flicker", zero delays.
  const [user, setUser] = useState<User | null>(initialUser)
  
  // Como o servidor já decidiu quem é o usuário, não precisamos iniciar em "loading"
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const updateUser = (updatedData: Partial<User>) => {
    setUser((prev) => {
      const newUser = prev ? { ...prev, ...updatedData } : null
      return newUser
    })
  }

  useEffect(() => {
    setUser(initialUser)

    // Se o usuário não veio no initialUser e não estamos na página de login/registro,
    // tenta recuperar a sessão no cliente (o interceptor cuidará do refresh silencioso se necessário)
    if (!initialUser && typeof window !== "undefined") {
      const isAuthPage =
        window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/register")

      if (!isAuthPage) {
        authService
          .getMe()
          .then((res) => {
            if (res.success && res.data?.user) {
              setUser(res.data.user)
            }
          })
          .catch(() => {
            // O interceptor em api.ts já gerencia a tentativa de refresh e o redirecionamento
          })
      }
    }
  }, [initialUser])


  async function signIn(data: LoginInput) {
    const res = await authService.login(data)

    if (res.success && res.data) {
      // O backend já gravou os cookies HttpOnly na resposta com sucesso!
      setUser(res.data.user)

      // Redireciona para o dashboard
      router.push("/dashboard")
    }
  }

  async function logout() {
    try {
      // O fetchApi enviará o cookie e o backend limpará a sessão e os cookies
      await authService.logout()
    } catch (error) {
      console.error("Erro ao fazer logout no backend", error)
    } finally {
      setUser(null)
      router.push("/login")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
