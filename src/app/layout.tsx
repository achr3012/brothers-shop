import type { Metadata } from 'next'
import './globals.css'

import { Rubik } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Brothers Shop',
  description: 'Brothers Shop',
}

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
