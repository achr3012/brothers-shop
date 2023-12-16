import { getProducts } from "@/lib/actions"
import { Product } from "@prisma/client"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import classes from './page.module.css'

export const metadata: Metadata = {
  title: 'Products | Dashboard | Brothers Shop',
  description: 'Products | Dashboard | Brothers Shop',
}

// const products: Product[] = [
//   {
//     id: "qwertyuiop[",
//     title: "Testing Product",
//     desc: "Hello hhello this is product description haaah",
//     images: ['logo.svg', 'motherfucker.svg'],
//     price: 99,
//     published: true
//   },
// ]

// const products = [0, 1, 2, 3, 4, 5, 6]

export default async function Products() {
  const products = await getProducts()
  return (
    <>
      <h1 className="page-title">Products</h1>
      <div className={classes.products}>
        {products.map(product => (
          <div key={product.id}>
            <Link href={`/product/${product.id}`} className={classes.thumb}>
              <Image src={product.images[0]} alt={product.title} width={200} height={200} />
            </Link>
            <h3 className={classes.title}><Link href={`/product/${product.id}`}>{product.title}</Link></h3>
            <h3 className={classes.price}>${product.price} DZd</h3>
            <div className={classes.actions}>
              <Link href={`edit-product/${product.id}`}>Edit</Link>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
