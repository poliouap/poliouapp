import type { ReactNode } from "react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex w-full bg-orange-50">
      
      {/* Coluna Esquerda: Branding (Oculta no mobile) */}
      <div className="hidden lg:flex flex-col w-1/2 bg-[#FAF6E8] border-r border-stone-300/70 py-6 px-12 relative overflow-hidden">
        {/* Efeito Radial (opcional baseado no figma) */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 to-transparent to-70% pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 flex items-center justify-center bg-orange-50 rounded-full outline outline-1 outline-offset-[-1px] outline-neutral-900/80 shadow-[inset_0px_0px_0px_3px_rgba(250,246,232,1)]">
              <span className="text-neutral-900 text-2xl font-semibold font-serif leading-none mt-1">P</span>
            </div>
            <span className="text-neutral-900 text-2xl font-serif">Poliou</span>
          </div>
          
          {/* Main Text */}
          <div className="max-w-md mt-auto mb-16">
            <h1 className="text-neutral-900 text-5xl font-serif leading-[1.1] mb-6">
              Sua vida,<br/>organizada com<br/>intenção.
            </h1>
            <p className="text-stone-600 text-base font-sans leading-relaxed mb-10">
              Uma releitura digital do bullet journal. Rápido, tátil, e feito<br className="hidden xl:block" /> para quem gosta de escrever para pensar melhor.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                <span className="text-neutral-900 text-lg font-serif">Tarefas, eventos e notas em um só ritmo</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Ícone de Losango para Migração Automática */}
                <div className="w-1.5 h-1.5 bg-neutral-900 rotate-45" />
                <span className="text-neutral-900 text-lg font-serif">Migração mensal automática</span>
              </li>              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 border border-neutral-900 rounded-full" />
                <span className="text-neutral-900 text-lg font-serif">Coleções e índices personalizados</span>
              </li>
            </ul>
          </div>
          
          {/* Footer Text */}
          <div className="text-stone-600 text-xs font-sans uppercase tracking-[2.40px]">
            Poliou · Bullet Journal Digital
          </div>
        </div>
      </div>

      {/* Coluna Direita: Formulário (Mobile usa ela 100%) */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-between min-h-screen py-6 px-6 md:px-12 relative overflow-y-auto">
        
        {/* Mobile Header (Shown only on small screens) */}
        <div className="w-full max-w-sm mx-auto lg:hidden flex items-center gap-3 mb-6">
          <div className="w-9 h-9 flex items-center justify-center bg-orange-50 rounded-full outline outline-1 outline-offset-[-1px] outline-neutral-900/80 shadow-[inset_0px_0px_0px_3px_rgba(250,246,232,1)]">
             <span className="text-neutral-900 text-xl font-semibold font-serif leading-none mt-1">P</span>
          </div>
          <span className="text-neutral-900 text-xl font-serif">Poliou</span>
        </div>

        {/* Spacer top to push form to center */}
        <div className="hidden lg:block flex-1"></div>

        {/* Content Box */}
        <div className="w-full max-w-sm my-auto">
          {children}
        </div>
        
        {/* Spacer bottom to keep form centered before footer */}
        <div className="flex-1"></div>

        {/* Footer Right Side (Fluxo normal da página, sem absolute) */}
        <div className="text-center w-full text-stone-600 text-xs font-sans mt-8 pb-2">
          © {new Date().getFullYear()} Poliou. Escreva. Reflita. Realize.
        </div>
      </div>
      
    </div>
  )
}
