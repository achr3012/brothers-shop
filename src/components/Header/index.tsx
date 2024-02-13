import Logo from '@/components/Logo'
import classes from './index.module.css'

const data = { text: "Some breaking news Hnaaa hhh" }

export default function Header() {
  return (
    <header className={classes.header}>
      <p className={classes.breaking}>{data.text}</p>
      <div className={classes.logo}><Logo to="/" light /></div>
    </header>
  )
}