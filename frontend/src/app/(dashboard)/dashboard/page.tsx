"use client";

import { useAuth } from "@/contexts/auth.context";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F3E9] flex flex-col items-center justify-center font-sans text-neutral-900 p-8">
      <div className="w-full max-w-lg space-y-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Olá, {user?.name || "Visitante"}!
        </h1>
        <p className="text-stone-600 text-lg">
          Bem-vindo ao seu diário blindado. Esta é uma rota protegida. Se você está vendo isso, seu cookie JWT está funcionando perfeitamente!
        </p>

        <div className="pt-8">
          <button
            onClick={logout}
            className="w-full bg-[#1A1A1A] text-[#F5F3E9] font-medium text-base rounded-full py-3.5 hover:bg-neutral-800 transition-colors"
          >
            Sair e deletar Cookie
          </button>
        </div>
      </div>
    </div>
  );
}
