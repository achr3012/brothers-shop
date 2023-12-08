
import type { Metadata } from 'next'
import Navbar from '@/components/dashboard/navbar'
import "@uploadthing/react/styles.css";

export const metadata: Metadata = {
  title: 'Dashboard - Brothers Shop',
  description: 'Dashboard - Brothers Shop',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main">
      <Navbar />
      <div className="content">
        {children}
      </div>
    </div>
  )
}
