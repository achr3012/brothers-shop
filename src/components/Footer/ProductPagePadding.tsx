"use client"

import { usePathname } from "next/navigation"

function ProductPagePadding() {
  const pathname = usePathname()
  if (pathname.includes('/product')) {
    return <div style={{ paddingBottom: 50 }} />
  }
  return null
}

export default ProductPagePadding