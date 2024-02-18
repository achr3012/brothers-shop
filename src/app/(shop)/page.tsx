import prisma from '@/lib/prisma'
import ProductsFeed from '@/components/shop/ProductsFeed'

export default async function Home() {

  const products = await prisma.product.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } })

  return (
    <>
      <ProductsFeed products={products} />
    </>
  )
}
