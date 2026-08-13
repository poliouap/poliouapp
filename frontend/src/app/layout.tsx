import type { Metadata } from "next";
import { Providers } from "./providers";
import { Inter, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Poliouapp",
  description: "Seu diário e planejamento pessoal em formato tátil.",
};

import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || cookieStore.get("refreshToken")?.value;
  let initialUser = null;

  if (token) {
    try {
      const apiUrl = process.env.API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/auth/me`, {
        headers: {
          Cookie: `accessToken=${token}`, // Repassa o token para o backend
        },
        cache: 'no-store' // Sempre busca do servidor
      });
      
      if (res.ok) {
        const data = await res.json();
        initialUser = data.user;
      }
    } catch (e) {
      console.error("Failed to fetch initial user SSR", e);
    }
  }

  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorantGaramond.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-orange-50">
        <Providers initialUser={initialUser}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
