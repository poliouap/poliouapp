import { NextRequest } from "next/server"
import { proxyFormDataToBackend } from "@/lib/proxy"

export async function POST(request: NextRequest) {
  return proxyFormDataToBackend(request, "/api/users/profile/avatar")
}
