'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../styles/navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className={styles.nav}>
      <Link href="/" className={pathname === '/' ? styles.active : ''}>
        Home
      </Link>
      <Link
        href="/about"
        className={pathname === '/about' ? styles.active : ''}
      >
        About
      </Link>
      {/* <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          background: darkcyan;
          padding: 18px 20px;
        }
        span {
          color: white;
        }
        .active {
          font-weight: bold;
        }
      `}</style> */}
    </nav>
  )
}
