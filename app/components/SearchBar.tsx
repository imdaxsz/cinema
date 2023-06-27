'use client'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../styles/searchbar.module.css'
import { FaSearch } from 'react-icons/fa'

function SearchBar({ keyword }: { keyword?: string }) {
  const [word, setWord] = useState('')
  const focusRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?query=${word}`)
    if (focusRef.current instanceof HTMLInputElement) 
      focusRef.current.blur()
  }

  const focusSearchBar = () => {
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.focus()
  }
  
  useEffect(() => {
    if (keyword) setWord(keyword)
  }, [])

  return (
    <form onSubmit={onSubmit} aria-label="검색" role="search">
      <div className={styles.container} onClick={focusSearchBar}>
        <div className={styles.icon}>
          <FaSearch />
        </div>
        <input
          onChange={onChange}
          type="text"
          value={word}
          placeholder="작품 검색"
          className={styles.input}
          ref={focusRef}
        ></input>
      </div>
    </form>
  )
}

export default SearchBar
