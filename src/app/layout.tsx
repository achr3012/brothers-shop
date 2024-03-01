import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Brothers Shop',
  description: 'Brothers Shop',
  authors: { name: "Achraf Aissaoui" },
  openGraph: {
    url: "https://abrothers-shop.vercel.app/",
    type: "article",
    title: 'Brothers Shop',
    description: 'Brothers Shop',
    images: '/logo.svg'
  }
}

import { Noto_Sans } from 'next/font/google'
const noto_sans = Noto_Sans({
  weight: ['300', '400', '600'],
  subsets: ['latin']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={noto_sans.className}>
      <body>{children}</body>
    </html>
  )
}
