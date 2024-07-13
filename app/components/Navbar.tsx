'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from '@/app/styles/navbar.module.css'
import Image from 'next/image'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [searchKeyword, setSearchKeyword] = useState('')
  const searchParams = useSearchParams();

  const router = useRouter()
  const onClickMy = () => {
    router.refresh()
    router.push('/my')
  }

  useEffect(() => {
    const keyword = searchParams.get('query') || ''
    setSearchKeyword(keyword)
  }, [searchParams])

  return (
    <nav className={styles.nav}>
      <Link
        href="/"
        className={`flex ${styles.home} ${
          pathname === '/' ? styles.active : ''
        }`}
      >
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            priority={true}
            alt="logo"
            fill
            sizes="50vw"
          ></Image>
        </div>
        <span>Cinema</span>
      </Link>
      <Link
        href="/now-playing"
        className={pathname === '/now-playing' ? styles.active : ''}
      >
        현재상영작
      </Link>
      <Link
        href="/upcoming"
        className={pathname === '/upcoming' ? styles.active : ''}
      >
        개봉예정작
      </Link>
      <Link
        href="/genres"
        className={pathname === '/genres' ? styles.active : ''}
      >
        장르별
      </Link>
      <div className={styles.right}>
        <div className={styles.item}>
          <SearchBar keyword={searchKeyword} />
        </div>
        <div className={styles.item}>
          <span
            onClick={onClickMy}
            className={pathname === '/my' ? styles.active : ''}
          >
            MY
          </span>
        </div>
      </div>
    </nav>
  )
}
