"use client"

import { deleteProductById } from "@/lib/actions"

export default function DeleteProduct({ id }: { id: string }) {
  const hendelDelete = async () => {
    if (confirm("Would you want to delete this Product ?") == true) {
      await deleteProductById(id)
    }
  }
  return (
    <button type="button" onClick={hendelDelete}>Delete</button>
  )
}