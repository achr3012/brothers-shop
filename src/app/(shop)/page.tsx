import prisma from '@/lib/prisma'
import ProductsFeed from '@/components/shop/ProductsFeed'

export const dynamic = 'force-dynamic'
export default async function Home() {
  const products = await prisma.product.findMany({ where: { published: true }, orderBy: { id: "desc" }, include: { category: { select: { name: true } } } })
  return <ProductsFeed products={products} />
}