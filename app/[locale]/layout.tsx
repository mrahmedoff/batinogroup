import type { Metadata } from "next";
import "../globals.css";
import { DataProvider } from "@/contexts/DataContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductProvider } from "@/contexts/ProductContext";

import FirebaseStatus from "@/components/FirebaseStatus";
import FirebaseDebugClient from "@/components/FirebaseDebugClient";

export const metadata: Metadata = {
  title: "BatinoGroup - Təchizat Həlləri və Mühəndislik",
  description: "Sənaye avtomatlaşdırması, elektrik təchizatı və mühəndislik xidmətləri",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <LanguageProvider>
            <DataProvider>
              <ProductProvider>
                {children}
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <FirebaseStatus />
                    <FirebaseDebugClient />
                    <script dangerouslySetInnerHTML={{
                      __html: `
                        console.log('🔥 Firebase Debug Commands Available:');
                        console.log('- window.firebaseDebug.debug() - Show Firebase config');
                        console.log('- window.firebaseDebug.test() - Test connection');
                        console.log('- window.firebaseDebug.addSample() - Add sample data');
                      `
                    }} />
                  </>
                )}
              </ProductProvider>
            </DataProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
