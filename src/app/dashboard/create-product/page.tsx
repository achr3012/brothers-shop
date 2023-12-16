import type { Metadata } from "next";
import CreateProductForm from "@/components/dashboard/createProductForm";

export const metadata: Metadata = {
  title: 'Create a new Product | Dashboard | Brothers Shop',
  description: 'Create a new Product | Dashboard | Brothers Shop',
}

export default function AddProduct() {
  return (
    <>
      <h2 className="page-title">Create a new Product</h2>
      <CreateProductForm />
    </>
  )
}