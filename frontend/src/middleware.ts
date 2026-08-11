import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Pega o token direto do cookie nativo do Next.js Request
  const token = request.cookies.get("poliouapp.token")?.value

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  // Se o usuário não tem token e tenta acessar página privada, manda pro login
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Se o usuário já tem token e tenta acessar a tela de login/cadastro, manda pro dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configura quais rotas o middleware deve monitorar
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
