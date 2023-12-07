"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import classes from './index.module.css'
export default function Links() {

  const pathname = usePathname()

  return (
    <ul>
      <li className={pathname == '/dashboard' ? classes.active : ''}>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li className={pathname == 'dashboard/products' ? classes.active : ''}>
        <Link href="dashboard/products">Products</Link>
      </li>
      <li className={pathname == '/dashboard/add-product' ? classes.active : ''}>
        <Link href="dashboard/add-product">Add Product</Link>
      </li>
      <li className={pathname == '/dashboard/orders' ? classes.active : ''}>
        <Link href="dashboard/orders">Orders</Link>
      </li>
      <li className={pathname == '/dashboard/categories' ? classes.active : ''}>
        <Link href="dashboard/categories">Categories</Link>
      </li>
    </ul>
  )
}
