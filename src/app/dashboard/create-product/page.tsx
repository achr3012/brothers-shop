import prisma from '@/lib/prisma'
import type { Metadata } from "next";
import CreateProductForm from "@/components/dashboard/CreateProductForm";

export const metadata: Metadata = {
  title: 'Create a new Product | Dashboard | Brothers Shop',
  description: 'Create a new Product | Dashboard | Brothers Shop',
}

export default async function AddProduct() {
  const categories = await prisma.category.findMany({ orderBy: { id: 'desc' } })
  return (
    <>
      <h2 className="page-title">Create a new Product</h2>
      <CreateProductForm categories={categories} />
    </>
  )
}