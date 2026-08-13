"use client";

import React, { useRef } from "react";
import { useAuth } from "@/contexts/auth.context";
import { userService } from "@/services/user.service";
import { updateProfileSchema, avatarSchema } from "@/lib/validations/profile";
import { z } from "zod";

type Tab = "geral" | "seguranca";
type Theme = "light" | "dark" | "system";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();

  const [activeTab, setActiveTab] = React.useState<Tab>("geral");
  const [selectedTheme, setSelectedTheme] = React.useState<Theme>(
    user?.themePreference || "light"
  );
  const [name, setName] = React.useState(user?.name || "");
  
  const [isSaving, setIsSaving] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when user loads
  React.useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.themePreference) setSelectedTheme(user.themePreference);
  }, [user]);

  // Generate initials from user name
  const initials = React.useMemo(() => {
    if (!user?.name) return "?";
    const parts = user.name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }, [user?.name]);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      // Valida os dados no Zod antes de disparar o fetch!
      const validatedData = updateProfileSchema.parse({
        name,
        themePreference: selectedTheme,
      });

      const res = await userService.updateProfile(validatedData);
      if (res.success && res.data) {
        updateUser(res.data.user);
        alert("Perfil salvo com sucesso!");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message);
      } else {
        alert(`Erro ao salvar perfil: ${error.message}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = async (theme: Theme) => {
    setSelectedTheme(theme);
    try {
      const validatedData = updateProfileSchema.parse({ themePreference: theme });
      const res = await userService.updateProfile(validatedData);
      if (res.success && res.data) {
        updateUser(res.data.user);
      }
    } catch (error: any) {
      console.error("Erro ao salvar tema:", error.message);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Validações no Zod para limite de tamanho e formato!
      avatarSchema.parse({ file });

      const res = await userService.uploadAvatar(file);
      if (res.success && res.data) {
        updateUser(res.data.user);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message);
      } else {
        alert(`Erro ao fazer upload da imagem: ${error.message}`);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full max-w-[688px] mx-auto px-4 py-8 sm:px-6 md:px-10 md:py-14 flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium font-[var(--font-outfit)] leading-tight md:leading-10 text-neutral-900">
          Configurações
        </h1>
        <p className="text-sm text-stone-600">
          Personalize sua experiência no Poliou.
        </p>

        {/* Tabs */}
        <div className="mt-2 inline-flex w-fit items-center bg-white rounded-full p-[5px] outline outline-1 outline-stone-300 shadow-sm">
          <button
            id="tab-geral"
            onClick={() => setActiveTab("geral")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "geral"
                ? "bg-neutral-900 text-orange-50"
                : "text-stone-600 hover:text-neutral-900"
            }`}
          >
            Geral
          </button>
          <button
            id="tab-seguranca"
            onClick={() => setActiveTab("seguranca")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "seguranca"
                ? "bg-neutral-900 text-orange-50"
                : "text-stone-600 hover:text-neutral-900"
            }`}
          >
            Segurança
          </button>
        </div>
      </header>

      {/* Content based on active tab */}
      {activeTab === "geral" && (
        <div className="flex flex-col gap-8">
          {/* ========== CARD: Perfil ========== */}
          <section
            id="settings-profile"
            className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0px_12px_40px_-20px_rgba(20,17,14,0.10)]"
          >
            <h2 className="text-lg font-medium font-[var(--font-outfit)] text-neutral-900">
              Perfil
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Suas informações públicas no Poliou.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mt-6 sm:mt-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className={`w-24 h-24 rounded-full outline outline-2 outline-stone-300 overflow-hidden flex items-center justify-center ${isUploading ? "opacity-50" : ""}`}>
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-medium text-neutral-900">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* File Input Oculto */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/jpeg, image/png, image/webp" 
                  className="hidden" 
                />

                {/* Camera edit button */}
                <button
                  id="btn-change-avatar"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center outline outline-1 outline-stone-300 shadow-sm hover:bg-stone-50 transition-colors disabled:cursor-not-allowed"
                  title="Alterar avatar"
                >
                  {isUploading ? (
                    <span className="w-4 h-4 border-2 border-stone-600 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="text-stone-600"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Name field + save */}
              <div className="flex flex-col gap-5 flex-1 w-full">
                <div>
                  <label
                    htmlFor="settings-name"
                    className="text-sm font-medium text-neutral-900 block mb-1"
                  >
                    Nome
                  </label>
                  <input
                    id="settings-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl bg-orange-50/40 text-sm text-neutral-900 outline outline-1 outline-stone-300 shadow-sm focus:outline-2 focus:outline-neutral-900 transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                <button
                  id="btn-save-profile"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="w-full sm:w-32 h-9 bg-neutral-900 text-orange-50 rounded-full text-sm font-medium shadow-sm hover:bg-neutral-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSaving ? "Salvando..." : "Salvar perfil"}
                </button>
              </div>
            </div>
          </section>

          {/* ========== CARD: Preferências ========== */}
          <section
            id="settings-preferences"
            className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0px_12px_40px_-20px_rgba(20,17,14,0.10)]"
          >
            <h2 className="text-lg font-medium font-[var(--font-outfit)] text-neutral-900">
              Preferências
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Ajuste a aparência da interface.
            </p>

            <p className="text-sm font-medium text-neutral-900 mt-8">
              Tema da Interface
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
              {/* Theme: Claro */}
              <button
                id="theme-light"
                onClick={() => handleThemeChange("light")}
                className={`w-full h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-3 outline outline-1 shadow-sm transition-all ${
                  selectedTheme === "light"
                    ? "bg-neutral-400/5 outline-neutral-400"
                    : "bg-orange-50/30 outline-stone-300 hover:outline-neutral-400/60"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedTheme === "light"
                      ? "bg-neutral-400/20"
                      : "bg-stone-200"
                  }`}
                >
                  {/* Sun icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={
                      selectedTheme === "light"
                        ? "text-neutral-500"
                        : "text-stone-600"
                    }
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-900">
                  Claro
                </span>
              </button>

              {/* Theme: Escuro */}
              <button
                id="theme-dark"
                onClick={() => handleThemeChange("dark")}
                className={`w-full h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-3 outline outline-1 shadow-sm transition-all ${
                  selectedTheme === "dark"
                    ? "bg-neutral-400/5 outline-neutral-400"
                    : "bg-orange-50/30 outline-stone-300 hover:outline-neutral-400/60"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedTheme === "dark"
                      ? "bg-neutral-400/20"
                      : "bg-stone-200"
                  }`}
                >
                  {/* Moon icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={
                      selectedTheme === "dark"
                        ? "text-neutral-500"
                        : "text-stone-600"
                    }
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-900">
                  Escuro
                </span>
              </button>

              {/* Theme: Sistema */}
              <button
                id="theme-system"
                onClick={() => handleThemeChange("system")}
                className={`w-full h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-3 outline outline-1 shadow-sm transition-all ${
                  selectedTheme === "system"
                    ? "bg-neutral-400/5 outline-neutral-400"
                    : "bg-orange-50/30 outline-stone-300 hover:outline-neutral-400/60"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedTheme === "system"
                      ? "bg-neutral-400/20"
                      : "bg-stone-200"
                  }`}
                >
                  {/* Monitor icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={
                      selectedTheme === "system"
                        ? "text-neutral-500"
                        : "text-stone-600"
                    }
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-900">
                  Sistema
                </span>
              </button>
            </div>
          </section>
        </div>
      )}

      {activeTab === "seguranca" && (
        <div className="flex flex-col gap-8">
          {/* ========== CARD: Segurança ========== */}
          <section
            id="settings-security"
            className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0px_12px_40px_-20px_rgba(20,17,14,0.10)]"
          >
            <h2 className="text-lg font-medium font-[var(--font-outfit)] text-neutral-900">
              Segurança
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Controle o acesso à sua conta.
            </p>

            {/* Email row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 sm:mt-8">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-stone-200 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-stone-600"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">E-mail</p>
                  <p className="text-sm text-stone-600">
                    {user?.email || "email@exemplo.com"}
                  </p>
                </div>
              </div>
              <button
                id="btn-change-email"
                className="w-full sm:w-auto h-9 px-5 rounded-full outline outline-1 outline-stone-300 shadow-sm text-sm font-medium text-neutral-900 hover:bg-stone-50 transition-colors"
              >
                Alterar e-mail
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-300/60 my-6" />

            {/* Password row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-stone-200 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-stone-600"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Senha</p>
                  <p className="text-sm text-stone-600">
                    Use uma senha forte e única para proteger seus dados.
                  </p>
                </div>
              </div>
              <button
                id="btn-change-password"
                className="w-full sm:w-auto h-9 px-5 rounded-full outline outline-1 outline-stone-300 shadow-sm text-sm font-medium text-neutral-900 hover:bg-stone-50 transition-colors shrink-0"
              >
                Alterar senha
              </button>
            </div>
          </section>

          {/* ========== CARD: Excluir Conta ========== */}
          <section
            id="settings-delete-account"
            className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 outline outline-1 outline-red-600/20 shadow-[0px_12px_40px_-20px_rgba(20,17,14,0.10)]"
          >
            <h2 className="text-lg font-medium font-[var(--font-outfit)] text-neutral-900">
              Excluir Conta
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-5">
              Ao excluir sua conta, todos os seus cadernos, hábitos e dados
              serão apagados permanentemente.
            </p>

            <button
              id="btn-delete-account"
              className="mt-6 sm:mt-8 w-full sm:w-auto h-9 px-6 bg-red-400 text-orange-50 rounded-full text-sm font-medium shadow-sm hover:bg-red-500 transition-colors"
            >
              Excluir minha conta
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
