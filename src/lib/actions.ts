"use server"

import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { orderSchema, productSchema } from './zodSchema'
import { revalidatePath } from 'next/cache'
import { OrderDataType } from '@/components/shop/OrderForm'
import { Status } from '@prisma/client'


export async function createProduct(prevState: any, formData: FormData) {
  const formImages = formData.get('images') as string
  // data => formData
  const d = {
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    images: [formImages],
    price: Number(formData.get("price")),
    published: (formData.get("publish") == "true"),
    categoryId: parseInt(formData.get("category") as string)
  }

  const validatedFields = productSchema.safeParse(d)

  // Return early if the form data is invalid
  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors }

  let images: string[];

  if (typeof formImages == 'string' && formImages.includes(',')) {
    images = formImages.split(',')
  } else {
    images = [formImages as string]
  }

  d.images = images

  const product = await prisma.product.create({ data: d })
  redirect(`/dashboard/?newProduct=${product.id}`)
}

interface ProductWithCategory {
  category: {
    id: number;
    name: string;
  };
  id: string;
  title: string;
  desc: string;
  images: string[];
  price: number;
  published: boolean;
  categoryId: number;
  createdAt: Date;

}
export async function updateProduct(product: ProductWithCategory, formData: FormData) {
  const formImages = formData.get('images') as string
  // data => formData
  const d = {
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    images: [formImages],
    price: Number(formData.get("price")),
    published: (formData.get("publish") == "true"),
    categoryId: parseInt(formData.get("category") as string)
  }

  const validatedFields = productSchema.safeParse(d)

  // Return early if the form data is invalid
  if (!validatedFields.success) return console.log(validatedFields.error.flatten().fieldErrors)

  let images: string[];

  if (typeof formImages == 'string' && formImages.includes(',')) {
    images = formImages.split(',')
  } else {
    images = [formImages as string]
  }

  d.images = images

  if (await prisma.product.update({ data: d, where: { id: product.id } })) {
    revalidatePath(`/product/${product.id}`, 'page')
    redirect(`/dashboard/?updatedProduct=${product.id}`)
  }
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