import { Rubik } from 'next/font/google'
import type { Metadata } from 'next'
import Navbar from '@/components/dashboard/navbar'

export const metadata: Metadata = {
  title: 'Dashboard - Brothers Shop',
  description: 'Dashboard - Brothers Shop',
}

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${rubik.className} main`}>
      <Navbar />
      <div className="content">
        {children}
      </div>
    </div>
  )
}
