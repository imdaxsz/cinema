'use client'

import Link from 'next/link'
import styles from '../styles/searchresult.module.css'
import { useState } from 'react'
import { moreData } from '../utils/fetchData'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function SearchResult({ movies }: { movies: any }) {
  const [list, setList] = useState<any[]>(movies.results)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const searchParams = useSearchParams()
  const keyword = searchParams?.get('query')

  const onClick = async () => {
    if (keyword){
      moreData(3, currentPage, setCurrentPage, setList, keyword)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3>검색 결과 ({movies.total_results})</h3>
        {keyword && (
          <>
            <span>
              <strong>'{keyword}'</strong>에 대한 검색 결과
            </span>
            {movies.results.length === 0 ? (
              <div className={styles['not-found']}>
                '<span>{keyword}</span>'에 대한 검색결과가 없습니다.
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
                {movies.total_pages > currentPage && (
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
