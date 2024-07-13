import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchMovies } from '../movies/actions'

import styles from '@/app/styles/my.module.css'
import Link from 'next/link'
import LogoutBtn from '../components/LogoutBtn'
import LikeMovies from './LikeMovies'

export default async function My() {
  const session: any = await getServerSession(authOptions)
  const { user } = session

  const { results } = await fetchMovies()

  const list = results.length > 5 ? results.slice(0, 5) : results
  const more = results.length > 5

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
        <LikeMovies list={list} more={more} />
        <Link href="/my/leave" className={styles.link}>
          <span>회원탈퇴</span>
        </Link>
      </div>
    </div>
  )
}
