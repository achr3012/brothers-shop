import Logo from '@/components/Logo'
import styles from './index.module.css'
import SearchForm from './SearchForm'

const data = { text: "Some breaking news Hnaaa hhh" }

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.breaking}>{data.text}</p>
      <div className={styles.flex}>
        <div className={styles.logo}><Logo to="/" light /></div>
        <SearchForm />
      </div>
    </header>
  )
}