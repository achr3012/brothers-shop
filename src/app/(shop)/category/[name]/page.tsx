import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma'
import ProductsFeed from "@/components/shop/ProductsFeed";

export default async function Category({ params }: { params: { name: string } }) {
  const { name } = params
  if (!name) return notFound()
  const products = await prisma.product.findMany({ where: { AND: { category: { name }, published: true } }, include: { category: { select: { name: true } } }, orderBy: { id: "desc" } })
  return (
    <>
      <h2 style={{ padding: '1rem' }}>Category:: {name}</h2>
      <ProductsFeed products={products} />
    </>
  )
}