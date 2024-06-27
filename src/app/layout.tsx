import { Providers } from "@/providers";
import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import dayjs from "dayjs";

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
          <main className="px-2.5 py-10 bg-gradient-to-t from-gray-800 from-0% via-black via-50% to-gray-800 to-100% min-w-screen min-h-screen">
            {children}
          </main>

          <footer className="w-screen mt-auto p-2 box-border flex flex-col sm:flex-row sm:py-4 sm:gap-2 justify-center items-center">
            <p className="font-bold text-center text-winePatternDark">
              Desenvolvido por{" "}
              <Link href="/creditos">
                <span className="underline">Togather Group</span>
              </Link>
            </p>

            <p className="font-bold text-winePatternDark">
              &copy; {dayjs().format("YYYY")} Todos os direitos reservados.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
