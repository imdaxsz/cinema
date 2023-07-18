'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from '../styles/navbar.module.css'
import Image from 'next/image'
import SearchBar from './SearchBar'

export default function Navbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const keyword = searchParams?.get('query')
  const router = useRouter()
  const onClickMy = () => {
    router.refresh()
    router.push('/my')
  }

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
          <SearchBar keyword={keyword ? keyword : ''} />
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
