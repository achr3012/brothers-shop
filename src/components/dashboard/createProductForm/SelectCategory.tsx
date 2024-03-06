"use client"

import { Category } from "@prisma/client"
import { useState } from "react"

export default function SelectCategory({ categories, initialCategory }: { categories: Category[], initialCategory: { name: string, id: number } }) {
  const [category, setCategory] = useState(initialCategory.id)
  return (
    <>
      <h4>Select category</h4>
      <ul>
        {categories.map(cate => (
          <li
            key={cate.id}
            onClick={() => setCategory(cate.id)}
            style={cate.id === category ? { color: "#00ffff", borderColor: '#00ffff' } : {}}>
            {cate.name}
          </li>
        ))}
      </ul>
      <input type="hidden" name="category" value={category} />
    </>
  )
}
