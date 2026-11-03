import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata ={
  title: "Controle de Equipamentos - CTIC",
  description: "Entrada, atendimento e saída de equipamentos ao setor de TI.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return(
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        {children} 
      </body>
    </html>
  );
}