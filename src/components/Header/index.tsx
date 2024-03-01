import Logo from '@/components/Logo'
import styles from './index.module.css'
import SearchForm from './SearchForm'
import { noto_sans_arabic } from '@/app/(shop)/product/[id]/page'
import Navbar from './Navbar'

export default function Header() {
  // "الدفع عند الاستلام، اسرع واطلب الآن"
  const data = { text: "" }
  return (
    <header className={styles.header}>
      {data.text && <p className={`${styles.breaking} ${noto_sans_arabic.className}`}>{data.text}</p>}
      <div className={styles.flex}>
        <div className={styles.logo}><Logo to="/" light /></div>
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
      </div>
      <nav className={styles.nav}>
        <Navbar />
      </nav>
    </header>
  )
}