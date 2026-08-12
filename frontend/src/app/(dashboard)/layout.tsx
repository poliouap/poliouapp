"use client";

import React from "react";
import { useAuth } from "@/contexts/auth.context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  
  const firstName = user?.name?.split(" ")[0] || "Usuário";

  return (
    <div className="flex h-screen w-full bg-orange-50 font-sans text-neutral-900 overflow-hidden relative">
      {/* Sidebar Lateral */}
      <aside className="w-64 h-full bg-white/60 border-r border-stone-300/70 flex flex-col justify-between hidden md:flex">
        {/* Top Section */}
        <div className="p-5 flex flex-col gap-10">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 flex items-center justify-center bg-orange-50 rounded-full outline outline-1 outline-neutral-900/80 shadow-[inset_0px_0px_0px_3px_rgba(250,246,232,1.00)]">
              <span className="text-xl font-semibold font-['Outfit']">P</span>
            </div>
            <span className="text-xl font-normal font-['Outfit']">Poliou</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {/* Nav Item: Active */}
            <div className="flex items-center gap-3 bg-stone-200 px-4 py-2.5 rounded-xl cursor-pointer">
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                  <rect x="2" y="2" width="5" height="5" strokeWidth="1.2" rx="1" />
                  <rect x="9" y="2" width="5" height="5" strokeWidth="1.2" rx="1" />
                  <rect x="2" y="9" width="5" height="5" strokeWidth="1.2" rx="1" />
                  <rect x="9" y="9" width="5" height="5" strokeWidth="1.2" rx="1" />
                </svg>
              </div>
              <span className="text-sm font-medium">Dashboard</span>
            </div>

            {/* Nav Items: Inactive */}
            {[
              { 
                name: "Bullet Journal", 
                icon: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              },
              { 
                name: "Habit Tracker", 
                icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>
              },
              { 
                name: "Media Tracker", 
                icon: <><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" strokeWidth="1.5"/><line x1="7" y1="2" x2="7" y2="22" strokeWidth="1.5"/><line x1="17" y1="2" x2="17" y2="22" strokeWidth="1.5"/><line x1="2" y1="12" x2="22" y2="12" strokeWidth="1.5"/><line x1="2" y1="7" x2="7" y2="7" strokeWidth="1.5"/><line x1="2" y1="17" x2="7" y2="17" strokeWidth="1.5"/><line x1="17" y1="17" x2="22" y2="17" strokeWidth="1.5"/><line x1="17" y1="7" x2="22" y2="7" strokeWidth="1.5"/></>
              },
              { 
                name: "Vision Board", 
                icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/><polyline points="21 15 16 10 5 21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>
              },
              { 
                name: "Configurações", 
                icon: <><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" strokeWidth="1.5"/></>
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-200/50 hover:text-neutral-900 cursor-pointer transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section: User Profile */}
        <div className="p-5 border-t border-stone-300/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-200 rounded-full outline outline-1 outline-stone-300 overflow-hidden flex items-center justify-center shrink-0">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="7" r="4" />
                  <path d="M3 18C3 14 6 12 10 12C14 12 17 14 17 18" />
                </svg>
              )}
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-medium truncate">{firstName}</span>
              <span className="text-xs text-stone-600 truncate">Plano Gratuito</span>
            </div>
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-stone-500 hover:text-red-600 transition-colors shrink-0 outline-none" 
              title="Sair da conta"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-['Outfit'] font-semibold text-neutral-900 mb-2">
              Sair da conta
            </h3>
            <p className="text-stone-600 text-sm mb-6">
              Tem certeza que deseja encerrar sua sessão atual? Você precisará fazer login novamente para acessar seu painel.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  logout();
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
