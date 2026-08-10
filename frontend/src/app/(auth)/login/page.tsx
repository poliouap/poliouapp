import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Entrar | Poliouapp",
  description: "Acesse a sua conta no Poliouapp.",
}

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-10">
        <h1 className="text-neutral-900 text-4xl font-serif leading-10 mb-2">
          Bem-vindo de volta.
        </h1>
        <p className="text-stone-600 text-sm font-sans leading-5">
          Abra seu caderno e continue de onde parou.
        </p>
      </div>
      
      <LoginForm />

      <div className="mt-8 text-center">
        <span className="text-stone-600 text-sm font-sans leading-5">
          Ainda não tem uma conta?{" "}
        </span>
        <Link href="/register" className="text-neutral-900 text-sm font-medium font-sans underline leading-5">
          Criar conta
        </Link>
      </div>
    </div>
  )
}
