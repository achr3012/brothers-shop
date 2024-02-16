"use client"

import { useState } from 'react'
import { type Order, type Status } from '@prisma/client'

import styles from './index.module.css'
import { updateStatus } from '@/lib/actions'

const OrderStatus = ({ order }: { order: Order }) => {
  const [status, setStatus] = useState(order.status)


  const statusChangeHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status
    const updatedStatus = await updateStatus(order.id, newStatus) as Status
    setStatus(updatedStatus)
  }

  return (
    <div className={styles.status}>
      <select
        value={status} onChange={statusChangeHandler}
        className={status == 'CONFIRMED' ? styles.confirmed : status == 'CANCELED' ? styles.canceled : styles.pending}>
        <option value='CONFIRMED'>CONFIRMED</option>
        <option value='PENDING'>PENDING</option>
        <option value='CANCELED'>CANCELED</option>
      </select>
      <button type="button" title='Delete'><img src="/delete.svg" alt="" /></button>
    </div>
  )
}

export default OrderStatus