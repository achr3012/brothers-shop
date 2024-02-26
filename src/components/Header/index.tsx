import Logo from '@/components/Logo'
import styles from './index.module.css'
import SearchForm from './SearchForm'
import { noto_sans_arabic } from '@/app/(shop)/product/[id]/page'
import Navbar from './Navbar'

const data = { text: "الدفع عند الاستلام، اسرع واطلب الآن" }

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={`${styles.breaking} ${noto_sans_arabic.className}`}>{data.text}</p>
      <div className={styles.flex}>
        <div className={styles.logo}><Logo to="/" light /></div>
        <SearchForm />
      </div>
      <nav className={styles.nav}><Navbar /></nav>
    </header>
  )
}