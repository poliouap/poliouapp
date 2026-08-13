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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorantGaramond.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-orange-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
