import styles from '@/app/styles/my.module.css'
import Link from 'next/link'
import LogoutBtn from './LogoutBtn'
import Image from 'next/image'

export default function MyPage({ user, likes }: { user: any; likes: any[] }) {
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
          <span className={styles.title}>관심 영화</span>
          {likes.length > 5 && (
            <Link href="/my/likes">
              <span className={styles['btn-all']}>
                전체보기 &nbsp;&nbsp;&gt;
              </span>
            </Link>
          )}
          <div className={styles.list}>
            {likes.length === 0 && (
              <div className="text-center">관심 영화가 없습니다.</div>
            )}
            {likes.map((movie) => (
              <Link
                key={movie.id}
                href={{
                  pathname: `/movies/${movie.id}/${movie.title}`,
                }}
                className={styles.poster}
              >
                <div>
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : '/default.png'
                    }
                    alt={movie.title}
                    fill
                    sizes="50vw"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
