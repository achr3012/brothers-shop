import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import OrderForm from '@/components/shop/OrderForm'

import styles from './page.module.css'
import { Noto_Sans_Arabic } from 'next/font/google'
import ProductImages from '@/components/shop/product/ProductImages'
export const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '600'],
  subsets: ['arabic']
})

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { id: params.id }, select: { title: true, desc: true, images: true } })
  return {
    title: product?.title + " | A Brothers Shop",
    description: product?.desc.slice(0, 100) + "...",
    openGraph: {
      url: "https://abrothers-shop.vercel.app/",
      type: "article",
      title: product?.title,
      description: product?.desc.slice(0, 100) + "...",
      images: product?.images[0]
    }
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) notFound()
  // Remove the first item (I displayed it as thumbnail)
  const [, ...photos] = product.images;
  return (
    <>
      <div className={styles.thumb} style={{ background: `url('${product.images[0]}') center / contain no-repeat`, height: '333px' }} />
      <div className={styles.info}>
        <h2 className={styles.title} dir='auto'>{product.title}</h2>
        <p className={styles.desc} dir='auto'>{product.desc}</p>
        {photos.length > 0 && (
          <div className={styles.photos}>
            <h2>Photos</h2>
            <ProductImages photos={photos} alt={product.title} />
          </div>
        )}
      </div>
      <div id="buy" className={styles.formContainer}>
        <h3 className={noto_sans_arabic.className}>معلومات الزبون</h3>
        <OrderForm productId={product.id} font={noto_sans_arabic} />
      </div>
      <div className={styles.buy}>
        <p>{product.price} دج</p>
        <a href='#buy'>Buy | شراء</a>
      </div>
    </>
  )
}