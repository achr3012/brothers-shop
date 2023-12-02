import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Brothers Shop',
  description: 'Dashboard - Brothers Shop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      Private{children}
    </>
  )
}
