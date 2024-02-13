import { notFound } from 'next/navigation'
import { getProduct } from "@/lib/dbQueries"
import styles from './page.module.css'
import Image from 'next/image'
import OrderForm from '@/components/shop/OrderForm'

import { Noto_Sans_Arabic } from 'next/font/google'
const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '600'],
  subsets: ['arabic']
})

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) notFound()
  // Remove the first item (I displayed it as thumbnail)
  const [, ...photos] = product.images;
  return (
    <>
      <div className={styles.thumb}>
        <Image src={product.images[0]} alt={product.title} width={300} height={300} />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.desc}>{product.desc}</p>
        {photos.length > 0 && (
          <div className={styles.photos}>
            <h2>Photos</h2>
            <ul>
              {photos.map((url) => (
                <li key={url}><Image src={url} width={180} height={180} alt={product.title} /></li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div id="form" className={styles.formContainer}>
        <h3 className={noto_sans_arabic.className}>معلومات الزبون</h3>
        <OrderForm product={product} font={noto_sans_arabic} />
      </div>
      <div className={styles.buy}>
        <p>{product.price}</p>
        <a href='#form'>Buy | شراء</a>
      </div>
    </>
  )
}

export default ProductPage;
