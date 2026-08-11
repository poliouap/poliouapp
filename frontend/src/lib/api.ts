import Cookies from "js-cookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

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

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  }

  // Lê o cookie usando o js-cookie
  const token = Cookies.get("poliouapp.token")
  if (token) { 
    defaultHeaders["Authorization"] = `Bearer ${token}` 
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    // Tenta extrair o JSON da resposta
    let data: any
    try {
      data = await response.json()
    } catch (e) {
      data = null // Caso a resposta não seja JSON (ex: 204 No Content)
    }

    if (!response.ok) {
      // O backend Express retorna a mensagem no campo 'error'
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
