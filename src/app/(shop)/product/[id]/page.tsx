import { notFound } from 'next/navigation'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { getProduct } from "@/lib/dbQueries"
import OrderForm from '@/components/shop/OrderForm'

import type { Metadata, ResolvingMetadata } from 'next'
import styles from './page.module.css'
import { Noto_Sans_Arabic } from 'next/font/google'
export const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '600'],
  subsets: ['arabic']
})

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { id: params.id }, select: { title: true, desc: true, images: true } })
  return {
    title: product?.title + " | A Brothers Shop",
    description: product?.desc.slice(0, 100) + "...",
    authors: { name: "Achraf Aissaoui" },
    openGraph: {
      url: "https://abrothers-shop.vercel.app/",
      type: "article",
      title: product?.title,
      description: product?.desc.slice(0, 100) + "...",
      images: product?.images[0]
    }
  }
}

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
        <h2 className={styles.title} dir='auto'>{product.title}</h2>
        <p className={styles.desc} dir='auto'>{product.desc}</p>
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

export default ProductPage;
