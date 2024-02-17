import { Product } from "@prisma/client";
import styles from './index.module.css'
import Image from "next/image";
import Link from "next/link";

export default function ProductsFeed({ products }: { products: Product[] }) {
  return (
    <div className={styles.products}>
      {products.length > 0 ? (
        <>{products.map(product => (
          <div key={product.id} className={styles.product}>
            <div className={styles.thumb}>
              <Link href={`/product/${product.id}`}>
                <Image src={product.images[0]} width={150} height={150} alt={product.title} />
              </Link>
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}><Link href={`/product/${product.id}`}>{product.title}</Link></h2>
              <p className={styles.price}>{product.price} DzD</p>
              <div className={styles.buy}>
                <Link href={`/product/${product.id}#buy`}>Buy ~ شراء</Link>
              </div>
            </div>
          </div>
        ))}</>
      ) : <p>No posts to show</p>}
    </div>
  )
}
