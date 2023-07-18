'use client'

import Link from 'next/link'
import styles from '../styles/list.module.css'
import { useState } from 'react'
import { getMoreLikes, moreData } from '../utils/fetchData'
import Image from 'next/image'

export default function MovieList({
  movies,
  filter,
  genre,
  userId
}: {
  movies: any
  filter: number
  genre?: string
  userId?: string
}) {
  const [list, setList] = useState<any[]>(movies.results)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const onClick = async () => {
    if (filter === 3 && userId) getMoreLikes(userId, currentPage, setCurrentPage, setList)
    else moreData(filter, currentPage, setCurrentPage, setList)
  }

  const title = ['🎞️지금 상영중인 영화💫', '📆개봉 예정 영화✨', '전체', '관심 영화']

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {genre ? <h3>{genre}</h3> : <h3>{title[filter]}</h3>}
        <div className={styles.list}>
          {list.map((movie: any) => (
            <Link
              key={movie.id}
              href={{
                pathname: `/movies/${movie.id}/${movie.title}`,
              }}
            >
              <div className={styles.movie}>
                <div className={styles.img}>
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
                <h4 className={styles.title}>{movie.title}</h4>
                {filter !== 3 && <span>{movie.release_date} 개봉</span>}
              </div>
            </Link>
          ))}
        </div>
        {movies.total_pages > currentPage && (
          <button className="btn-more" onClick={onClick}>
            더보기
          </button>
        )}
      </div>
    </div>
  )
}
