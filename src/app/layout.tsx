import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import "./reset.css";

// Font
const roboto = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sensei Divino",
  description: "Aplicativo para gerenciamento de atletas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <div className="bg_shadow">{children}</div>
      </body>
    </html>
  );
}
