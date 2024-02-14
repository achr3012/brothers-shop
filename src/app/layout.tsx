import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Brothers Shop',
  description: 'Brothers Shop',
}

import { Noto_Sans } from 'next/font/google'
const noto_sans = Noto_Sans({
  weight: ['300', '400', '600', '800'],
  subsets: ['latin']
})

import { Noto_Sans_Arabic } from 'next/font/google'
export const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '600'],
  subsets: ['arabic']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={noto_sans.className}>
      <body>{children}</body>
    </html>
  )
}
