import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/contexts/DataContext";

import { AuthProvider } from "@/contexts/AuthContext";
import { ProductProvider } from "@/contexts/ProductContext";

import FirebaseStatus from "@/components/FirebaseStatus";
import FirebaseDebugClient from "@/components/FirebaseDebugClient";

export const metadata: Metadata = {
  title: "BatinoGroup - Equipment Solutions & Engineering",
  description: "Industrial automation, electrical supply and engineering services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
