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
      <li className={pathname == '/dashboard/products' ? classes.active : ''}>
        <Link href={pathname == '/dashboard' ? "/dashboard/products" : "products"}>Products</Link>
      </li>
      <li className={pathname == '/dashboard/create-product' ? classes.active : ''}>
        <Link href={pathname == '/dashboard' ? "/dashboard/create-product" : "create-product"}>Create Product</Link>
      </li>
      <li className={pathname == '/dashboard/orders' ? classes.active : ''}>
        <Link href={pathname == '/dashboard' ? "/dashboard/orders" : "orders"}>Orders</Link>
      </li>
      <li className={pathname == '/dashboard/categories' ? classes.active : ''}>
        <Link href={pathname == '/dashboard' ? "/dashboard/categories" : "categories"}>Categories</Link>
      </li>
    </ul>
  )
}
