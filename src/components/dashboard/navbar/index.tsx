

import Links from './Links'
import classes from './index.module.css'
import Logo from '@/components/Logo'


export default function Navbar() {

  return (
    <nav className={classes.navbar}>
      <Logo />
      <Links />
    </nav>
  )
}