import { Providers } from "@/providers";
import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import Frequency from "@/components/frequency";

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
            <header>HEADER</header>
            <main className="bg-[url('/background_1920_1080.jpg')] bg-cover bg-right-top bg-no-repeat w-full h-full">
              {children}
            </main>

            <footer>FOOTER</footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
