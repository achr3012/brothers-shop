"use server"

import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { orderSchema, productSchema } from './zodSchema'
import { revalidatePath } from 'next/cache'
import { OrderDataType } from '@/components/shop/OrderForm'


export async function createProduct(prevState: any, formData: FormData) {

  // data => formData
  const d = {
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    images: formData.get("images") as string,
    price: Number(formData.get("price")),
    publish: (formData.get("publish") == "true")
  }

  const validatedFields = productSchema.safeParse(d)

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  let images: string[];

  if (d.images.includes(',')) {
    images = d.images.split(',')
  } else {
    images = [d.images]
  }

  const product = await prisma.product.create({
    data: {
      title: d.title,
      desc: d.desc,
      price: d.price,
      images,
      published: d.publish
    }
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/products')
  redirect(`/dashboard/?newProduct=${product.id}`)

}

export async function createOrder(data: OrderDataType, productId: string) {

  if (!orderSchema.safeParse({ ...data, productId })) {
    return false;
  }

  const order = await prisma.order.create({
    data: { ...data, productId }
  })

  return order;

}