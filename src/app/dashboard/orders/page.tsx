import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import prisma from '@/lib/prisma'


export const dynamic = 'force-dynamic'
export default async function OrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { product: { select: { title: true, images: true } } } })

  return (
    <>
      <h2 className="page-title">Orders (Les commandes)</h2>
      <div className={styles.orders}>
        <div className={`${styles.column} ${styles.head}`}>
          <p>Product</p>
          <p>Customer</p>
          <p>Wilaya</p>
          <p>Commune</p>
          <p>Delivery</p>
          <p>Date</p>
          <p>Status</p>
        </div>
        {orders && (
          orders.map(order => (
            <div key={order.id} className={styles.column}>
              <div className={styles.product}>
                <Link href={`/product/${order.productId}`} target='_blank'>
                  <Image src={order.product.images[0]} width={35} height={35} alt={order.product.title} />
                  <p>{order.product.title}</p>
                </Link>
              </div>
              <div className={styles.customer}>
                <p>{order.name}</p>
                <p>{order.phone}</p>
              </div>
              <div>{order.wilaya}</div>
              <div><Link href={`https://www.google.com/search?q=Code+postal+${order.commune}+${order.wilaya}`} target='_blank'>{order.commune}</Link></div>
              <div>{order.delivery}</div>
              <div>{order.createdAt.toLocaleDateString('en-GB')} {order.createdAt.toLocaleTimeString('en-GB')}</div>
              <div className={styles.status}>
                <select>
                  <option>PENDING</option>
                  <option>CONFIRMED</option>
                  <option>CANCELED</option>
                </select>
                <button type="button"><Image src="/delete.jfif" width={50} height={50} alt=""></Image></button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
