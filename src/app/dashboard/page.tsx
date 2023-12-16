import Logo from "@/components/Logo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard | Brothers Shop',
  description: 'Dashboard | Brothers Shop',
}

export default async function Dashboard() {

  return (
    <>
      <Logo light />
      <Logo />
      <h1>DashBoard</h1>
    </>
  )
}
