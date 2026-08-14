export class ApiError extends Error {
  public status: number
  public details?: any

  constructor(message: string, status: number, details?: any) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.details = details
  }
}

interface CustomRequestInit extends RequestInit {
  _isRetry?: boolean
}

// Controle de concorrência: Singleton de promise para evitar múltiplos refreshes paralelos
let refreshPromise: Promise<boolean> | null = null

async function requestRefresh(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
        return res.ok
      } catch {
        return false
      } finally {
        refreshPromise = null
      }
    })()
  }

  return refreshPromise
}

export async function fetchApi<T>(endpoint: string, options: CustomRequestInit = {}): Promise<T> {
  // Agora o endpoint é relativo (ex: "/api/auth/login") — mesmo domínio do Next.js
  const url = endpoint

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  }

  const config: CustomRequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  // Remove o Content-Type se estivermos enviando um FormData
  if (options.body instanceof FormData) {
    const headers = new Headers(config.headers)
    headers.delete("Content-Type")
    config.headers = headers
  }

  try {
    const response = await fetch(url, config)

    // Tenta extrair o JSON da resposta
    let data: any
    try {
      data = await response.json()
    } catch {
      data = null // Caso a resposta não seja JSON (ex: 204 No Content)
    }

    if (!response.ok) {
      // Se for 401 (Unauthorized) e não for uma rota que já é de autenticação ou uma tentativa de retry
      const isAuthRoute =
        endpoint.includes("/api/auth/login") ||
        endpoint.includes("/api/auth/register") ||
        endpoint.includes("/api/auth/refresh")

      if (response.status === 401 && !isAuthRoute && !options._isRetry) {
        // Tenta renovar o token de acesso via refresh token
        const refreshSucceeded = await requestRefresh()

        if (refreshSucceeded) {
          // Repete a requisição original com o novo accessToken gravado nos cookies
          return fetchApi<T>(endpoint, {
            ...options,
            _isRetry: true,
          })
        }

        // Se o refresh falhar (sessão de 7 dias expirou ou foi deletada no banco),
        // redireciona o usuário para a página de login para evitar o estado zumbi
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname
          const isLoginPage = currentPath.startsWith("/login") || currentPath.startsWith("/register")
          if (!isLoginPage) {
            window.location.href = "/login"
          }
        }
      }

      // O backend Express retorna a mensagem no campo 'error' ou 'message'
      const errorMessage = data?.error || data?.message || "Ocorreu um erro inesperado."
      throw new ApiError(errorMessage, response.status, data?.details)
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error // Repassa nosso erro customizado
    }
    // Erros de rede (Backend fora do ar, sem internet, etc)
    throw new ApiError("Não foi possível conectar ao servidor. Verifique sua conexão.", 503)
  }
}
