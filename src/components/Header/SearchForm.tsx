"use client"

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function SearchForm() {
  const router = useRouter()
  const queryRef = useRef<HTMLInputElement>(null)

  const [opened, setOpened] = useState(false)

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (queryRef.current && queryRef.current.value.trim().length > 0) {
      setOpened(false)
      router.push(`/search?q=${queryRef.current.value}`)
      queryRef.current.value = ''
    }
  }


  return (
    <form onSubmit={searchHandler}>
      <input style={opened ? { display: 'block' } : {}} ref={queryRef} type='search' name='keywords' placeholder='ابحث هنا...' />
      <button type='button' onClick={() => setOpened(!opened)} title='search'><img src='/search.svg' alt='Serach' /></button>
    </form>
  )
}