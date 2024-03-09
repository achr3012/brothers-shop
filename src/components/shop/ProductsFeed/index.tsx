import { noto_sans_arabic } from '@/lib/fonts'
import styles from './index.module.css'
import Image from "next/image";
import Link from "next/link";

interface Product {
  category: {
    name: string;
  };
  id: string;
  title: string;
  desc: string;
  images: string[];
  price: number;
  published: boolean;
  categoryId: number | null;
  createdAt: Date;
}

export default function ProductsFeed({ products }: { products: Product[] }) {
  return (
    <div className={styles.products}>
      <h1 className={noto_sans_arabic.className}>آخر المنتجات</h1>
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
              <p className={styles.price}>
                <Link href={`/category/${product.category.name}`}>{product.category.name}</Link>
              </p>
              <p className={styles.price}>{product.price} DzD</p>
              <div className={styles.buy}>
                <Link href={`/product/${product.id}#buy`}>Buy ~ شراء</Link>
              </div>
            </div>
          </div>
        ))}</>
      ) : <p>No Products to show</p>}
    </div>
  )
}
