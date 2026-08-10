import { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Criar Conta | Poliouapp",
  description: "Crie a sua conta no Poliouapp.",
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-neutral-900 text-4xl font-serif leading-10 mb-2">
          Crie seu diário.
        </h1>
        <p className="text-stone-600 text-sm font-sans leading-5">
          Organize sua vida com intenção e foco a partir de hoje.
        </p>
      </div>
      
      <RegisterForm />

      <div className="mt-6 text-center">
        <span className="text-stone-600 text-sm font-sans leading-5">
          Já tem uma conta?{" "}
        </span>
        <Link href="/login" className="text-neutral-900 text-sm font-medium font-sans underline leading-5">
          Entrar
        </Link>
      </div>
    </div>
  )
}
