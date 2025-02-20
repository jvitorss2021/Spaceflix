import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/shared/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamFlix - Sua Plataforma de Streaming",
  description: "Assista aos melhores conteúdos em qualquer lugar, a qualquer momento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
