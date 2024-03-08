"use client"

import { useRef, useState, useTransition } from "react"

import styles from './index.module.css'
import { wilayas } from "@/lib/wilayas"
import { createOrder } from "@/lib/actions"
import { communes } from "@/lib/communes"
import { noto_sans_arabic } from "@/app/layout"
import { Order } from "@prisma/client"
import OrderThanks from "../OrderThanks"

export interface OrderDataType {
  name: string;
  phone: string;
  wilaya: string;
  commune: string;
  delivery: string;
}

const OrderForm = ({ productId }: { productId: string }) => {

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const wilayaRef = useRef<HTMLSelectElement>(null);
  const communeRef = useRef<HTMLSelectElement>(null);
  const deliveryRef = useRef<HTMLSelectElement>(null);

  const [isPending, startTransition] = useTransition();

  const [wilaya, setWilaya] = useState(0)
  const [errors, setErrors] = useState<Partial<OrderDataType>>({});
  const [order, setOrder] = useState<Order | false>(false)


  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regex = /\d+/;
    const match = e.target.value.match(regex);
    if (match) {
      setWilaya(parseInt(match[0], 10))
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nameRef.current && phoneRef.current && wilayaRef.current && communeRef.current && deliveryRef.current) {
      const data: OrderDataType = {
        name: nameRef.current.value.trim(),
        phone: phoneRef.current.value.trim(),
        wilaya: wilayaRef.current.value.trim(),
        commune: communeRef.current.value.trim(),
        delivery: deliveryRef.current.value.trim(),
      }

      const newErrors: Partial<OrderDataType> = {};

      if (!data.name || data.name.length < 4) newErrors.name = 'الاسم الكامل مطلوب.';

      const algerianPhoneRegex = /^(\+?213|0)(5|6|7)\d{8}$/;
      if (!data.phone || !algerianPhoneRegex.test(data.phone)) newErrors.phone = "رقم الهاتف مطلوب."

      const wilayaRegex = /^(?:[1-9]|[1-4][0-9]|5[0-8])\s*~\s*\S+$/;
      if (!data.wilaya || !wilayaRegex.test(data.wilaya)) newErrors.wilaya = "رقم الولاية مطلوب."

      if (data.delivery !== 'التوصيل للمكتب' && data.delivery !== 'التوصيل لباب المنزل') newErrors.delivery = "طريقة التوصيل مطلوبة"

      setErrors(newErrors);

      if (!isPending && Object.keys(newErrors).length === 0) {
        startTransition(async () => {
          const newOrder = await createOrder(data, productId);
          if (nameRef.current && phoneRef.current && wilayaRef.current && communeRef.current && deliveryRef.current) {
            nameRef.current.value = ""
            phoneRef.current.value = ""
            wilayaRef.current.value = "0"
            communeRef.current.value = "0"
            deliveryRef.current.value = "0"
          }
          setOrder(newOrder)
        })
      }

    }
  }
  return (
    <form onSubmit={submitHandler} className={`${styles.form} ${noto_sans_arabic.className}`} dir="rtl" lang="ar">
      {order && <OrderThanks orderName={order.name} setOrder={setOrder} />}
      <div>
        <label htmlFor="name">الاسم الكامل 👤</label>
        <input ref={nameRef} type="text" id="name" placeholder="الاسم الكامل" />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="phone">رقم الهاتف 📞</label>
        <input ref={phoneRef} type="number" id="phone" placeholder="رقم الهاتف" />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div>
        <label htmlFor="wilaya">رقم الولاية 🌎</label>
        <select ref={wilayaRef} onChange={handleWilayaChange} id="wilaya">
          <option value="0">اختر الولاية</option>
          {wilayas.map(wilaya => (
            <option key={wilaya.id} value={`${wilaya.id} ~ ${wilaya.ar_name}`}>{wilaya.id} ~ {wilaya.ar_name}</option>
          ))}
        </select>
        {errors.wilaya && <span className={styles.error}>{errors.wilaya}</span>}
      </div>

      <div>
        <label htmlFor="commune">البلدية 🏠</label>
        <select ref={communeRef} id="commune">
          <option value={0}>اختر البلدية</option>
          <CommuneOptions wilaya={wilaya} />
        </select>
      </div>

      <div>
        <label htmlFor="delivery">طريقة التوصيل</label>
        <select ref={deliveryRef} id="delivery">
          <option value={0}>إختر طريقة التوصيل</option>
          <option value="التوصيل للمكتب">التوصيل للمكتب</option>
          <option value="التوصيل لباب المنزل">التوصيل لباب المنزل</option>
        </select>
        {errors.delivery && <span className={styles.error}>{errors.delivery}</span>}
      </div>

      <button type="submit" disabled={isPending}>اضغط هنا للطلب</button>

    </form>
  )
}

export default OrderForm

const CommuneOptions = ({ wilaya }: { wilaya: number }) => {
  const filteredCommunes = communes.filter(commune => commune.wilaya_id == wilaya);
  const options = filteredCommunes.map(commune => <option key={commune.name} value={commune.name}>{commune.ar_name}</option>)
  return <>{options}</>
}