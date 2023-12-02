import styles from './page.module.css'

export default function Home() {


  return (
    <>
      <h1 className={styles.heading}>Brothers Shop</h1>
      <div className={styles.main}>

        <input type="text" placeholder='Name' />
        <input type="text" placeholder='Wilaya' />
        <input type="number" placeholder='Numero' />
        <input type='button' value="Acheter" />
      </div>
    </>
  )
}
