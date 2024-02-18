import { noto_sans_arabic } from '@/app/(shop)/product/[id]/page'
import ProductPagePadding from './ProductPagePadding'
import styles from './index.module.css'
export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.contact}>
          <h3 className={noto_sans_arabic.className}>اتصل بنا</h3>
          <ul>
            <li><a href='https://facebook.com/' target='_blank'><img src='/facebook.svg' /></a></li>
            <li><a href='https://instagram.com/' target='_blank'><img src='/instagram.svg' /></a></li>
            <li><a href='https://tiktok.com/' target='_blank'><img src='/tiktok.svg' /></a></li>
          </ul>
        </div>
        <div className={styles.copy}>
          <p>Made by <a href="https://instagram.com/its__achraf" target='_blank'>AcHReF</a></p>
          <p>A Brothers shop &copy; 2024</p>
          {/* <ProductPagePadding /> */}
        </div>
      </div>
    </>
  )
}