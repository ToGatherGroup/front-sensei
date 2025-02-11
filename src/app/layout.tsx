import { Providers } from "@/providers";
import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const metadata: Metadata = {
  title: "Sensei",
  description: "Aplicativo para gerenciamento e análise de atletas",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <Header />
          <main className="px-2.5 py-10 bg-gradient-to-t from-gray-800 from-0% via-black via-50% to-gray-800 to-100% min-w-screen min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
