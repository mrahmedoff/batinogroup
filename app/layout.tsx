import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/contexts/DataContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "BatinoGroup - Təchizat Həlləri və Mühəndislik",
  description: "Sənaye avtomatlaşdırması, elektrik təchizatı və mühəndislik xidmətləri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
