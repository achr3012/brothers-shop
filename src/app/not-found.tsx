import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { noto_sans_arabic } from "./(shop)/product/[id]/page"

export default function NotFound() {
  return (
    <>
      <Header />
      <div className={`${noto_sans_arabic.className} not-found`}>
        <h1>404 Not Found</h1>
        <p>عذرًا! يبدو أن الصفحة التي تبحث عنها غير موجودة. ربما تم نقل الصفحة التي تبحث عنها أو إزالتها أو أنها لم تكن موجودة أبدًا.</p>
        <p className="back">يمكنك العودة إلى الصفحة <Link href="/">الرئيسية</Link>.</p>
      </div>
      <Footer />
    </>
  )
}