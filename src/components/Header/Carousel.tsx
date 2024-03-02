"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { usePathname } from 'next/navigation'
interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
}

const Carousel = ({ products }: { products: Product[] }) => {
  const pathname = usePathname()
  if (pathname !== '/' || products.length == 0) return
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 7000, stopOnUserInteraction: true })])

  return (
    <div ref={emblaRef}>
      <div>
        {products.map(product => (
          <div key={product.id}>
            {product.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel