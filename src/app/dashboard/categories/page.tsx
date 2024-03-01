import prisma from '@/lib/prisma'
import styles from './page.module.css'
import CategoriesList from '@/components/dashboard/categories/CategoriesList'
import AddCategory from '@/components/dashboard/categories/AddCategory'

export const dynamic = 'force-dynamic'
export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { id: 'desc' }, select: { id: true, name: true, products: { select: { title: true, } } } })

  return (<>
    <h2 className="page-title">Categories</h2>
    <div className={styles.main}>
      <AddCategory className={styles.addCategory} />
      <CategoriesList categories={categories} className={styles.categories} />
    </div>
  </>)
}