'use client'
import Link from 'next/link'
import styles from '../styles/moveslide.module.css'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { useRef, useState } from 'react'

export default function MovieSlide({
  filter,
  movies,
}: {
  filter: string
  movies: any[]
}) {
  const slideRef = useRef<HTMLDivElement | null>(null)
  const [num, setNum] = useState(1)
  const onBeforeClick = () => {
    if (slideRef && slideRef.current) {
      slideRef.current.style.transform = `translateX(calc(-995px *${num - 2} ))`
      setNum((prev) => prev - 1)
    }
  }
  const onNextClick = () => {
    if (slideRef && slideRef.current) {
      slideRef.current.style.transform = `translateX(calc(-995px *${num} ))`
      setNum((prev) => prev + 1)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3>{filter}</h3>
        <div className={styles['slide-wrapper']}>
          <div className={styles.slide} ref={slideRef}>
            {movies?.map((movie: any) => (
              <Link
                key={movie.id}
                href={{
                  pathname: `/movies/${movie.id}/${movie.title}`,
                }}
              >
                <div className={styles.movie}>
                  <div className={styles.img}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                  </div>
                  <h4 className={styles.title}>{movie.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {num > 1 && (
          <button onClick={onBeforeClick} className={styles.before}>
            <SlArrowLeft className={styles.btn} />
          </button>
        )}
        {num < 4 && (
          <button onClick={onNextClick} className={styles.next}>
            <SlArrowRight className={styles.btn} />
          </button>
        )}
      </div>
    </div>
  )
}
