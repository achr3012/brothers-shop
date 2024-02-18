import { redirect } from "next/navigation"
import prisma from '@/lib/prisma'
import ProductsFeed from "@/components/shop/ProductsFeed"

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

  return (
    <>
      <p style={{ padding: '1rem' }}>Searching for: <b>{query}</b></p>
      <ProductsFeed products={products} />
    </>
  )
}

