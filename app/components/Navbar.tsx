'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../styles/navbar.module.css'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className={styles.nav}>
      <Link href="/" className={`flex ${pathname === '/' ? styles.active : ''}`}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" fill sizes='50vw'></Image>
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
      <Link href="/my" className={pathname === '/my' ? styles.active : ''}>
        My
      </Link>
    </nav>
  )
}
