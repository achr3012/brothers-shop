"use server"

import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { orderSchema, productSchema } from './zodSchema'
import { revalidatePath } from 'next/cache'
import { OrderDataType } from '@/components/shop/OrderForm'
import { Status } from '@prisma/client'


export async function createProduct(prevState: any, formData: FormData) {

  // data => formData
  const d = {
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    images: formData.get("images") as string,
    price: Number(formData.get("price")),
    publish: (formData.get("publish") == "true"),
    categoryId: parseInt(formData.get("category") as string)
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
      published: d.publish,
      categoryId: d.categoryId
    }
  })

  redirect(`/dashboard/?newProduct=${product.id}`)
}

export async function updateProduct(formData: FormData) {
  const images = formData.get("images")
  console.log(images)
}

export async function createOrder(data: OrderDataType, productId: string) {

  if (!orderSchema.safeParse({ ...data, productId })) {
    return false;
  }

  const order = await prisma.order.create({
    data: { ...data, productId }
  })
  if (order) revalidatePath('/dashboard/orders', 'page')
  return order;

}

export async function updateStatus(id: string, status: Status) {
  await prisma.order.update({ where: { id }, data: { status } })
  const updated = await prisma.order.findUnique({ where: { id }, select: { status: true } })
  return updated?.status
}

export async function deleteOrder(id: string) {
  const deletedOrder = await prisma.order.delete({ where: { id } })
  if (deletedOrder) revalidatePath('/dashboard/orders', 'page')
}

export async function deleteCategory(id: number) {
  const deletedOrder = await prisma.category.delete({ where: { id } })
  if (deletedOrder) revalidatePath('/dashboard/create-product', 'page')
}

export async function addCategory(formData: FormData) {
  const name = formData.get("cateName") as string
  if (!name) return false
  const cateExists = await prisma.category.findUnique({ where: { name } })
  if (cateExists) return false
  await prisma.category.create({ data: { name } })
  revalidatePath('/dashboard/categories', 'page')
  revalidatePath('/dashboard/create-product', 'page')
}

export async function deleteProductById(id: string) {
  const deletedProduct = await prisma.product.delete({ where: { id } })
  if (deletedProduct) revalidatePath('/dashboard/products', 'page')
}