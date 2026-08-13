"use client"

import { ReactNode } from "react"
import { AuthProvider } from "@/contexts/auth.context"

import { User } from "@/services/auth.service"

export function Providers({ 
  children, 
  initialUser 
}: { 
  children: ReactNode;
  initialUser: User | null;
}) {
  return (
    <AuthProvider initialUser={initialUser}>
      {children}
    </AuthProvider>
  )
}
