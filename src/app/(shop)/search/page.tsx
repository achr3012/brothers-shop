import { redirect } from "next/navigation"
import prisma from '@/lib/prisma'
import ProductsFeed from "@/components/shop/ProductsFeed"
import { Suspense } from "react"

export default async function Search({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const query = searchParams.q
  if (!query) return redirect('/')

  const products = await prisma.product.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { desc: { contains: query, mode: 'insensitive' } }
      ]
    }
  })

  console.log(products, query)

  return (
    <Suspense fallback={<div id="loading" />}>
      <ProductsFeed products={products} />
    </Suspense>
  )
}

