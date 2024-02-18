import { getProducts } from "@/lib/dbQueries"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import classes from './page.module.css'

export const metadata: Metadata = {
  title: 'Products | Dashboard | Brothers Shop',
  description: 'Products | Dashboard | Brothers Shop',
}

export const dynamic = 'force-dynamic'

export default async function Products() {
  const products = await getProducts()
  return (
    <>
      <h1 className="page-title">Products</h1>
      <div className={classes.products}>
        {products.map(product => (
          <div key={product.id}>

            <div className={`${classes.published} ${product.published ? classes.publishedTrue : classes.publishedFalse}`} >
              <span>{product.published ? "Published" : "Not Published"}</span>
            </div>

            <Link href={`/product/${product.id}`} target="_blank" className={classes.thumb}>
              <Image src={product.images[0]} alt={product.title} width={200} height={200} />
            </Link>

            <h3 className={classes.title}><Link href={`/product/${product.id}`} target="_blank">{product.title}</Link></h3>

            <h3 className={classes.price}>${product.price} (DZd)</h3>

            <div className={classes.actions}>
              <Link href={`edit-product?id=${product.id}`}>Edit</Link>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
