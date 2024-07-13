'use client'

import Link from 'next/link'
import styles from '../styles/searchresult.module.css'
import { useState } from 'react'
import Image from 'next/image'
import { FetchMoviesFun } from '../movies/actions'

interface MovieListProps {
  keyword: string
  initialItems: any[]
  totalPages: number
  fetchItems: FetchMoviesFun
  totalCount: number
}

export default function SearchResult({
  keyword,
  initialItems,
  totalPages,
  fetchItems,
  totalCount,
}: MovieListProps) {
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState<any[]>(initialItems)

  const onClick = async () => {
    const { currentPage, results } = await fetchItems('SEARCH', page + 1, {
      keyword,
    })
    setList((prev) => [...prev, ...results])
    setPage(currentPage)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3>검색 결과 ({totalCount ?? 0})</h3>
        {keyword && (
          <>
            <span>
              <strong>{`'${keyword}'`}</strong>에 대한 검색 결과
            </span>
            {totalCount === 0 ? (
              <div className={styles['not-found']}>
                <span>{`'${keyword}'`}</span>에 대한 검색결과가 없습니다.
              </div>
            ) : (
              <div className={styles.list}>
                {list.map((movie: any) => (
                  <Link
                    key={movie.id}
                    href={{
                      pathname: `/movies/${movie.id}/${movie.title}`,
                    }}
                    className={styles.movie}
                  >
                    <div className={styles.img}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="50vw"
                      />
                    </div>
                    <div className={styles.info}>
                      <h4 className={styles.title}>{movie.title}</h4>
                      <div className={styles.release}>
                        <span>{movie.release_date}</span>
                      </div>
                      <div className={styles.overview}>{movie.overview}</div>
                    </div>
                  </Link>
                ))}
                {totalPages > page && (
                  <button className="btn-more" onClick={onClick}>
                    더보기
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
