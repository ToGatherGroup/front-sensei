import { Providers } from "@/providers";
import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sensei Divino",
  description: "Aplicativo para gerenciamento de atletas",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <div className="min-h-screen w-full">
            <header>
              <nav className="w-full flex items-center justify-start gap-2">
                <Link href="/menu" className="w-full max-w-[100px]">
                  <img src="/logo-sensei.jpeg" className="w-full max-w-full block h-auto" />
                </Link>
              </nav>
            </header>
            <main className="bg-[url('/background_1920_1080.jpg')] bg-cover bg-right-top bg-no-repeat w-full h-full">
              {children}
            </main>

            <footer className="w-full flex items-center justify-center py-2">
              <span className="text-xs font-bold text-center text-gray-400">Desenvolvido por alunos da Univesp para a ONG Sensei Divino - &copy; Todos os direitos reservados - 2024</span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
