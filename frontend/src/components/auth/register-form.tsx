"use client"

import { useState, type FormEvent } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import { authService } from "@/services/auth.service"

// Ícone de check de sucesso
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-600">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [apiError, setApiError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    setApiError(null)
    setSuccess(false)
    try {
      await authService.register(data)
      setSuccess(true)
      
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error: any) {
      setApiError(error.message || "Ocorreu um erro ao tentar criar a conta.")
    }
  }

  // Função auxiliar para ver se o campo está válido
  const isValidField = (fieldName: keyof RegisterInput) => {
    return dirtyFields[fieldName] && !errors[fieldName]
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full relative">
      
      {/* Campo Nome */}
      <div className="w-full mb-4">
        <label htmlFor="name" className="block text-neutral-900/70 text-xs font-medium font-sans uppercase leading-4 tracking-widest mb-1">
          Nome
        </label>
        <div className="w-full border-b border-neutral-900/40 relative">
          <input 
            id="name" 
            type="text" 
            placeholder="Luiz Carlos"
            className="w-full bg-transparent pb-3 pt-1 text-stone-700 font-normal text-base font-sans outline-none focus:border-neutral-900 transition-colors pr-8 placeholder:font-normal placeholder:text-stone-600/60"
            {...register("name")}
          />
          {isValidField("name") && (
            <div className="absolute right-0 top-2">
              <CheckIcon />
            </div>
          )}
        </div>
        {errors.name && (
          <p className="mt-2 text-xs text-red-600 font-sans">{errors.name.message}</p>
        )}
      </div>

      {/* Campo E-mail */}
      <div className="w-full mb-4">
        <label htmlFor="email" className="block text-neutral-900/70 text-xs font-medium font-sans uppercase leading-4 tracking-widest mb-1">
          E-mail
        </label>
        <div className="w-full border-b border-neutral-900/40 relative">
          <input 
            id="email" 
            type="email" 
            placeholder="voce@exemplo.com"
            className="w-full bg-transparent pb-3 pt-1 text-stone-700 font-normal text-base font-sans outline-none focus:border-neutral-900 transition-colors pr-8 placeholder:font-normal placeholder:text-stone-600/60"
            {...register("email")}
          />
          {isValidField("email") && (
            <div className="absolute right-0 top-2">
              <CheckIcon />
            </div>
          )}
        </div>
        {errors.email && (
          <p className="mt-2 text-xs text-red-600 font-sans">{errors.email.message}</p>
        )}
      </div>

      {/* Campo Senha */}
      <div className="w-full mb-4">
        <label htmlFor="password" className="block text-neutral-900/70 text-xs font-medium font-sans uppercase leading-4 tracking-widest mb-1">
          Senha
        </label>
        <div className="w-full border-b border-neutral-900/40 relative">
          <input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Mínimo de 6 caracteres"
            className="w-full bg-transparent pb-3 pt-1 text-stone-700 font-normal text-base font-sans outline-none focus:border-neutral-900 transition-colors pr-16 placeholder:font-normal placeholder:text-stone-600/60"
            {...register("password")}
          />
          <div className="absolute right-0 top-1 flex items-center gap-2">
            {isValidField("password") && <CheckIcon />}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#666666] hover:text-[#1A1A1A] transition-colors p-1"
            >
              {showPassword ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="mt-2 text-xs text-red-600 font-sans">{errors.password.message}</p>
        )}
      </div>

      {/* Campo Confirmar Senha */}
      <div className="w-full mb-5">
        <label htmlFor="confirmPassword" className="block text-neutral-900/70 text-xs font-medium font-sans uppercase leading-4 tracking-widest mb-1">
          Confirmar Senha
        </label>
        <div className="w-full border-b border-neutral-900/40 relative">
          <input 
            id="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Repita a sua senha"
            className="w-full bg-transparent pb-3 pt-1 text-stone-700 font-normal text-base font-sans outline-none focus:border-neutral-900 transition-colors pr-16 placeholder:font-normal placeholder:text-stone-600/60"
            {...register("confirmPassword")}
          />
          <div className="absolute right-0 top-1 flex items-center gap-2">
            {isValidField("confirmPassword") && <CheckIcon />}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-[#666666] hover:text-[#1A1A1A] transition-colors p-1"
            >
              {showConfirmPassword ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-xs text-red-600 font-sans">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Termos de Uso */}
      <div className="flex items-start mb-5">
        <label className="flex items-start cursor-pointer group mt-0.5">
          <div className="relative w-4 h-4 mr-3 flex items-center justify-center shrink-0">
            <input type="checkbox" required className="peer appearance-none w-4 h-4 bg-white border border-neutral-500 rounded-sm checked:bg-neutral-900 checked:border-neutral-900 transition-colors cursor-pointer" />
            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-stone-600 text-xs font-sans leading-5 group-hover:text-neutral-900 transition-colors">
            Li e aceito os{" "}
            <a href="/terms" className="text-neutral-900 underline hover:text-neutral-600 transition-colors">Termos de Uso</a>
            {" "}e a{" "}
            <a href="/privacy" className="text-neutral-900 underline hover:text-neutral-600 transition-colors">Política de Privacidade</a>.
          </span>
        </label>
      </div>

      {/* Mensagens da API */}
      {apiError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm font-sans">{apiError}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm font-sans">Conta criada com sucesso! Indo para o login...</p>
        </div>
      )}

      {/* Botão Criar Conta */}
      <button 
        type="submit" 
        disabled={isSubmitting || success}
        className="w-full h-11 bg-neutral-900 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-orange-50 text-sm font-medium font-sans leading-5 tracking-tight">
          {isSubmitting ? "Criando conta..." : "Criar conta"}
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
