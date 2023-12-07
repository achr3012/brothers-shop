import Link from "next/link"
import Image from "next/image"
import classes from './index.module.css'

export default function Logo({ light }: { light?: boolean }) {
  return (
    <div className={light ? classes.logoLight : classes.logo}>
      <Link href="/dashboard">
        <Image src='https://utfs.io/f/d423f4a7-c3db-4bbd-829e-2e5bb9ed3cc7-1zbfv.svg' alt="A Brothers Shop" width={64} height={64} />
        <span> A Brothers Shop</span>
      </Link>
    </div>
  )
}
