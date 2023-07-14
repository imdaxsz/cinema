'use client'
import styles from '@/app/styles/my.module.css'
import Link from 'next/link'
import LogoutBtn from './LogoutBtn'

export default function MyPage({ user }: { user: any }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.user}>
          <div className="flex">
            <div className="flex-col">
              <p>{user.name}님</p>
              <span>{user.id}</span>
            </div>
            <Link href="/my/setting"></Link>
          </div>
          <LogoutBtn />
        </div>
        <div className={styles.movies}>
          <span>관심 영화</span>
          <div></div>
        </div>
      </div>
    </div>
  )
}
