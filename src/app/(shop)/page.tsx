import prisma from '@/lib/prisma'

import ProductsFeed from '@/components/shop/ProductsFeed'
import styles from './page.module.css'
import { Suspense } from 'react'

export default async function Home() {

  const products = await prisma.product.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } })

  return (
    <>
      <Suspense fallback={<div id="loading" />}>
        <ProductsFeed products={products} />
      </Suspense>
    </>
  )
}
