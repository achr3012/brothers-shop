"use client"
import { addCategory } from '@/lib/actions'
import { useRef } from 'react'
export default function AddCategory({ className }: { className: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const handelSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      e.currentTarget.form?.requestSubmit()
      inputRef.current.value = ""
    }
  }

  return (
    <form action={addCategory} className={className}>
      <input ref={inputRef} type="text" name="cateName" id="cateName" placeholder='Category name' />
      <button role="submit" onClick={handelSubmit}>Create Category</button>
      <p>Note: Consider making it one word</p>
    </form>
  )
}