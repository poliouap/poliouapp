import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.API_URL || "http://localhost:5000"

/**
 * Helper genérico que faz proxy de uma request do Next.js para o backend Express.
 * - Repassa body, cookies e headers relevantes
 * - Copia os `Set-Cookie` do backend para a resposta do Next.js
 */
export async function proxyToBackend(
  request: NextRequest,
  backendPath: string,
  options: { method: string }
) {
  const url = `${BACKEND_URL}${backendPath}`

  // Monta os headers para repassar ao backend
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  // Repassa os cookies do browser para o backend (accessToken, refreshToken, etc.)
  const cookieHeader = request.headers.get("cookie")
  if (cookieHeader) {
    headers["Cookie"] = cookieHeader
  }

  // Monta o fetch config
  const fetchOptions: RequestInit = {
    method: options.method,
    headers,
  }

  // Só inclui body em métodos que suportam (POST, PUT, PATCH)
  if (options.method !== "GET" && options.method !== "HEAD") {
    try {
      const body = await request.json()
      fetchOptions.body = JSON.stringify(body)
    } catch {
      // Request sem body (ex: POST /logout sem payload) — segue sem body
    }
  }

  // Faz a chamada real ao backend
  const backendResponse = await fetch(url, fetchOptions)

  // Lê o JSON da resposta do backend
  let data: any
  try {
    data = await backendResponse.json()
  } catch {
    data = null
  }

  // Cria a resposta do Next.js
  const response = NextResponse.json(data, { status: backendResponse.status })

  // Copia TODOS os Set-Cookie headers do backend para a resposta do Next.js
  // Isso faz os cookies ficarem no domínio do frontend (mesmo origin!)
  const setCookieHeaders = backendResponse.headers.getSetCookie()
  for (const cookie of setCookieHeaders) {
    response.headers.append("Set-Cookie", cookie)
  }

  return response
}
