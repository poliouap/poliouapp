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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const updateUser = (updatedData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null))
  }

  useEffect(() => {
    // Ao iniciar o app, o backend já vai ler o cookie HttpOnly e retornar o usuário, se houver.
    async function loadUser() {
      try {
        const res = await authService.getMe()
        if (res.success && res.data) {
          setUser(res.data.user)
        }
      } catch (error) {
        // Cookie não existe, inválido ou expirado.
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])


  async function signIn(data: LoginInput) {
    const res = await authService.login(data)
    
    if (res.success && res.data) {
      // O backend já gravou os cookies HttpOnly na resposta com sucesso!
      // Nós apenas salvamos o usuário no estado local
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
