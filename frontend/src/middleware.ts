import type { NextRequest } from "next/server"
import { routeGuardMiddleware } from "./core/middlewares/route-guard.middleware"

// O Next.js OBRIGA que este arquivo exista na raiz do 'src' com o nome 'middleware.ts',
// mas a lógica pesada agora está delegada para a pasta 'core/middlewares'.
export function middleware(request: NextRequest) {
  return routeGuardMiddleware(request)
}

// Configura quais rotas o middleware deve monitorar
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
