"use client";

import { useAuth } from "@/contexts/auth.context";

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Extrai o primeiro nome ou "Visitante"
  const firstName = user?.name?.split(" ")[0] || "Visitante";
  
  // Array temporário de dias da semana para o cabeçalho
  const diaSemana = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

  return (
    <div className="w-full max-w-5xl mx-auto p-10 pt-14 flex flex-col gap-10">
      
      {/* Header */}
      <header className="flex flex-col gap-2">
        <span className="text-stone-600 text-xs font-semibold uppercase tracking-widest">
          {diaSemana}
        </span>
        <h1 className="text-5xl font-['Outfit'] text-neutral-900 tracking-tight">
          Olá, {firstName}
        </h1>
        <p className="text-stone-600 text-base mt-2">
          Uma visão geral do seu dia. Comece por onde fizer sentido.
        </p>
      </header>

      {/* Top Cards Section (4 columns) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Bullet Journal", desc: "3 cadernos" },
          { title: "Habit Tracker", desc: "4 hábitos" },
          { title: "Media Tracker", desc: "6 títulos" },
          { title: "Vision Board", desc: "1 quadro" }
        ].map((card, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-xl h-32 p-5 flex flex-col justify-between shadow-[0px_1px_4px_-2px_rgba(20,17,14,0.30)] border border-stone-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Ícone de Placeholder da caixinha (svg genérico baseado no figma) */}
            <div className="w-5 h-5 flex items-center justify-center text-stone-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-neutral-900">{card.title}</h3>
              <p className="text-xs text-stone-500 mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Main Widgets Section (3 columns) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { title: "Tarefas de hoje" },
          { title: "Hábitos da semana" },
          { title: "Anotações rápidas" }
        ].map((widget, idx) => (
          <div 
            key={idx} 
            className="h-56 rounded-xl border border-stone-300 p-6 flex flex-col gap-3 bg-white/40 backdrop-blur-sm shadow-sm"
          >
            <h2 className="text-lg font-normal font-['Outfit'] text-neutral-900">
              {widget.title}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed mt-2">
              Em breve — este widget será<br />preenchido automaticamente.
            </p>
          </div>
        ))}
      </section>

    </div>
  );
}
