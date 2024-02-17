"use client"
import { usePathname, useRouter } from 'next/navigation'
import styles from './index.module.css'
import { useEffect, useRef, useState } from 'react'

export default function SearchForm() {
  const router = useRouter()
  const queryRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const pathname = usePathname()
  let isSearchPage = pathname.includes('/search') ? true : false
  useEffect(() => {
    if (!isSearchPage) {
      setQuery('')
    }
  }, [isSearchPage])

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (queryRef.current && queryRef.current.value.trim().length > 0) {
      setQuery(queryRef.current.value)
      router.push(`/search?q=${queryRef.current.value}`)
      queryRef.current.value = ''
    }
  }

  return (
    <form onSubmit={searchHandler} className={styles.searchForm}>
      <div className={styles.group}>
        <input ref={queryRef} type='search' name='keywords' placeholder='Search here...' />
        <button type='submit' title='search'><img src='/search.svg' alt='Serach' /></button>
      </div>
      {query && <p>Searching for: {query}</p>}
    </form>
  )
}