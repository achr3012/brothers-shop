"use client"

import { deleteCategory } from "@/lib/actions"

export default function DeleteCategory({ id }: { id: number }) {
  const deleteHandler = async () => {
    if (confirm("Would you want to delete this Category ?") == true) {
      await deleteCategory(id)
    }
  }
  return <button onClick={deleteHandler}>&times;</button>
}
