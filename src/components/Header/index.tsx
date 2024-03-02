import prisma from '@/lib/prisma'
import Logo from '@/components/Logo'
import styles from './index.module.css'
import SearchForm from './SearchForm'
import { noto_sans_arabic } from '@/app/(shop)/product/[id]/page'
import Navbar from './Navbar'
import Carousel from './Carousel'

type SettingsType = {
  headerText: string,
  carouselProducts: string[]
}

export default async function Header() {
  const settings = await prisma.settings.findUnique({ where: { id: 1 }, select: { headerText: true, carouselProducts: true } }) as SettingsType
  const carouselProducts = await prisma.product.findMany({
    where: {
      AND: {
        id: { in: settings.carouselProducts },
        published: true
      }
    },
    select: {
      id: true,
      title: true,
      images: true,
      price: true
    }
  })

  return (
    <header className={styles.header}>
      {settings.headerText && <p className={`${styles.breaking} ${noto_sans_arabic.className}`}>{settings.headerText}</p>}
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
        <Carousel products={carouselProducts} />
      </div>
    </header>
  )
}