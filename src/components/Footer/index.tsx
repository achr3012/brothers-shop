import ProductPagePadding from './ProductPagePadding'
import styles from './index.module.css'
export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <ul>
          <li><a href='https://facebook.com/' target='_blank'><img src='/facebook_logo_icon.png' /></a></li>
          <li><a href='https://instagram.com/' target='_blank'><img src='/instagram_logo_icon.png' /></a></li>
          <li><a href='https://tiktok.com/' target='_blank'><img src='/tiktok_logo_icon.png' /></a></li>
        </ul>
        <div className={styles.copy}>
          <p>Made with ❤ by <a href="https://instagram.com/its__achraf" target='_blank'>AcHReF</a></p>
          <p>All rights reserverd &copy; 2024</p>
          <ProductPagePadding />
        </div>
      </div>
    </>
  )
}