import prisma from '@/lib/prisma'
import Link from "next/link"
export const revalidate = 80000
export default async function Navbar() {
  const categories = await prisma.category.findMany({ orderBy: { id: 'desc' }, select: { name: true } })
  return (
    <ul>
      {categories.length > 0 && categories.map(cate => (
        <li key={cate.name}><Link href={`/category/${cate.name}`}>{cate.name}</Link></li>
      ))}
      <li><Link href={`/category/uncategorized`}>Uncategorized</Link></li>
    </ul>
  )
}