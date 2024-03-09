import prisma from '@/lib/prisma'
import Logo from '@/components/Logo'
import styles from './index.module.css'
import SearchForm from './SearchForm'
import { noto_sans_arabic } from '@/lib/fonts'
import Navbar from './Navbar'
import Carousel from './Carousel'

type SettingsType = {
  headerText: string,
  carouselProducts: string[]
}

export default async function Header() {
  const { headerText, carouselProducts } = await prisma.settings.findUnique({
    where: { id: 1 },
    select: { headerText: true, carouselProducts: true }
  }) as SettingsType

  const carouselProductsArr = await prisma.product.findMany({
    where: {
      AND: {
        id: { in: carouselProducts },
        published: true
      }
    },
    select: {
      id: true,
      title: true,
      images: true,
      price: true
    },
    orderBy: { id: 'desc' },
    take: 4
  })

  return (
    <header className={styles.header}>
      {headerText && <p className={`${styles.breaking} ${noto_sans_arabic.className}`}>{headerText}</p>}
      <div className={styles.flex}>
        <div className={styles.logo}><Logo to="/" light /></div>
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
      </div>
      <nav className={styles.nav}>
        <Navbar />
      </nav>
      <div className={styles.carousel}>
        <Carousel products={carouselProductsArr} />
      </div>
    </header>
  )
}