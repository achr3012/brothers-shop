import type { Metadata } from 'next'
import './globals.css'

import { Noto_Sans } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Brothers Shop',
  description: 'Brothers Shop',
}

const noto_sans = Noto_Sans({
  weight: ['300', '400', '600', '800'],
  subsets: ['latin']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>{children}</body>
    </html>
  )
}
