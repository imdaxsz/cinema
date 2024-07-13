'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/styles/list.module.css'
import { FILTER } from '@/app/types'
import { FetchMoviesFun, SearchOptions } from '@/app/movies/actions'
import { MOVIE_LIST_TYPE } from '@/app/constant'

interface MovieListProps {
  initialItems: any[]
  totalPages: number
  fetchItems: FetchMoviesFun
  filter?: FILTER
  genre?: string
  searchOptions?: SearchOptions
}

export default function MovieList({
  initialItems,
  totalPages,
  fetchItems,
  filter = 'ALL',
  genre = '',
  searchOptions,
}: MovieListProps) {
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState<any[]>(initialItems)

  const onClick = async () => {
    const { currentPage, results } = await fetchItems(
      filter,
      page + 1,
      searchOptions,
    )
    setList((prev) => [...prev, ...results])
    setPage(currentPage)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3>{filter === 'GENRE' ? genre : MOVIE_LIST_TYPE[filter as FILTER]}</h3>
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
                {filter !== 'LIKE' && <span>{movie.release_date} 개봉</span>}
              </div>
            </Link>
          ))}
        </div>
        {totalPages > page && (
          <button className="btn-more" onClick={onClick}>
            더보기
          </button>
        )}
      </div>
    </div>
  )
}
