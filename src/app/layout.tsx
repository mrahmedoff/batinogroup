import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BatinoGroup - Azərbaycanda №1 Təchizat Şirkəti',
  description: 'BatinoGroup, alış-veriş və təchizat sahəsində etibarlı tərəfdaşınız. 15+ illik təcrübə, 1500+ müştəri, 24/7 dəstək və qlobal şəbəkə.',
  keywords: 'təchizat, alış-veriş, procurement, supply chain, logistika, Azərbaycan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}