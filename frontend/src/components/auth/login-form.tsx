"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"
import { authService } from "@/services/auth.service"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const [apiError, setApiError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setApiError(null)
    setSuccess(false)
    try {
      const response = await authService.login(data)
      setSuccess(true)
      // Aqui no futuro vamos chamar o AuthContext para salvar o token e redirecionar
      console.log("Login com sucesso! Token:", response.accessToken)
      
      // Simulação temporária de redirecionamento visual
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } catch (error: any) {
      setApiError(error.message || "Ocorreu um erro ao tentar fazer login.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full relative">
      
      {/* Campo E-mail */}
      <div className="w-full mb-6">
        <label htmlFor="email" className="block text-neutral-900/70 text-xs font-medium font-sans uppercase leading-4 tracking-widest mb-2">
          E-mail
        </label>
        <div className="w-full border-b border-neutral-900/40 relative">
          <input 
            id="email" 
            type="email" 
            placeholder="voce@exemplo.com"
            className="w-full bg-transparent pb-3 pt-1 text-neutral-900 font-semibold text-base font-sans outline-none focus:border-neutral-900 transition-colors placeholder:font-normal placeholder:text-stone-600/60"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-xs text-red-600 font-sans">{errors.email.message}</p>
        )}
      </div>

      {/* Campo Senha */}
      <div className="w-full mb-8">
        <label htmlFor="password" className="block text-neutral-900/70 text-xs font-medium font-sans uppercase leading-4 tracking-widest mb-2">
          Senha
        </label>
        <div className="w-full border-b border-neutral-900/40 relative">
          <input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••"
            className="w-full bg-transparent pb-3 pt-1 text-neutral-900 font-semibold text-base font-sans outline-none focus:border-neutral-900 transition-colors pr-10 placeholder:font-normal placeholder:text-stone-600/60"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1 text-[#666666] hover:text-[#1A1A1A] transition-colors p-1"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-xs text-red-600 font-sans">{errors.password.message}</p>
        )}
      </div>

      {/* Lembrar de mim / Esqueci a senha */}
      <div className="flex items-center justify-between mb-8">
        <label className="flex items-center cursor-pointer group">
          <div className="relative w-4 h-4 mr-2 flex items-center justify-center">
            <input type="checkbox" className="peer appearance-none w-4 h-4 bg-white border border-neutral-500 rounded-sm checked:bg-neutral-900 checked:border-neutral-900 transition-colors cursor-pointer" />
            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-stone-600 text-sm font-sans leading-5 group-hover:text-neutral-900 transition-colors">
            Lembrar de mim
          </span>
        </label>

        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); alert("Funcionalidade de recuperar senha estará disponível em breve!"); }}
          className="text-neutral-900 text-sm font-sans underline leading-5 hover:text-neutral-600 transition-colors"
        >
          Esqueceu a senha?
        </a>
      </div>

      {/* Mensagens da API */}
      {apiError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm font-sans">{apiError}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm font-sans">Login realizado com sucesso! Redirecionando...</p>
        </div>
      )}

      {/* Botão Entrar */}
      <button 
        type="submit" 
        disabled={isSubmitting || success}
        className="w-full h-11 bg-neutral-900 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-orange-50 text-sm font-medium font-sans leading-5 tracking-tight">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </span>
        {!isSubmitting && (
          <span className="text-orange-50 text-sm font-normal font-sans leading-5 tracking-tight group-hover:translate-x-1 transition-transform">
            →
          </span>
        )}
      </button>

    </form>
  )
}
