import { Providers } from "@/providers";
import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
