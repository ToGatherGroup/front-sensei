import { Providers } from "@/providers";
import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          toastOptions={{
            className: "!bg-winePattern !text-white !py-5",
          }}
        />
        {/* Allow react-hot-toast in all application */}
        <Providers>
          <div className="min-h-screen w-full">
            <header>
              <nav className="w-full flex items-center justify-start gap-2">
                <Link href="/menu" className="w-full max-w-[100px]">
                  <img
                    src="/logo-sensei.jpeg"
                    className="w-full max-w-full block h-auto"
                  />
                </Link>
              </nav>
            </header>
            <main className="bg-gradient-to-t from-gray-800 from-0% via-black via-50% to-gray-800 to-100% w-full h-full">
              {children}
            </main>

            <footer className="w-full flex items-center justify-center py-2">
              <span className="text-xs font-bold text-center text-gray-400">
                Desenvolvido por alunos da Univesp para a ONG Sensei Divino -
                &copy; Todos os direitos reservados - 2024
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
