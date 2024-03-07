"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
}

const Carousel = ({ products }: { products: Product[] }) => {
  const pathname = usePathname()
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnUserInteraction: true })])
  return (
    <>
      {pathname == '/' && products.length > 0 ? (
        <div ref={emblaRef}>
          <div>
            {products.map(product => (
              <div key={product.id}>
                <div style={{ background: `url('${product.images[0]}') center / cover` }}>
                  <div>
                    <h3><Link href={`/product/${product.id}`}>{product.title}</Link></h3>
                    <h4>{product.price} DzD</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : ''}
    </>

  )
}

export default Carousel