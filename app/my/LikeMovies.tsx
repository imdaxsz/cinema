import styles from '@/app/styles/my.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface LikeMoviesProps {
  list: any[]
  more: boolean
}

export default function LikeMovies({ list, more }: LikeMoviesProps) {
  return (
    <div className={styles.movies}>
      <span className={styles.title}>관심 영화</span>
      {more && (
        <Link href="/my/likes" className={styles['btn-all']}>
          전체보기 &nbsp;&nbsp;&gt;
        </Link>
      )}
      <div className={styles.list}>
        {list.length === 0 && (
          <div className="text-center">관심 영화가 없습니다.</div>
        )}
        {list.map((movie) => (
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
  )
}
