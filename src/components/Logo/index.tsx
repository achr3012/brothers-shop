import Link from "next/link"
import Image from "next/image"
import classes from './index.module.css'

export default function Logo({ light, src }: { light?: boolean, src?: string }) {
  return (
    <div className={light ? classes.logoLight : classes.logo}>
      <Link href="/dashboard">
        <Image src={src || "/logo.svg"} alt="A Brothers Shop" width={64} height={64} />
        <span> A Brothers Shop</span>
      </Link>
    </div>
  )
}
