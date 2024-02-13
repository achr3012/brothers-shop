import prisma from '@/lib/prisma'

export async function getProducts() {
  const products = await prisma.product.findMany({ take: 7, orderBy: { id: "desc" } })
  return products
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: {
      id
    }
  })
}