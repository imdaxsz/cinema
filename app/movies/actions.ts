'use server'

import { FILTER } from '@/app/types'
import { getDate } from '@/app/utils/getDate'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export interface SearchOptions {
  keyword?: string
  genreId?: number
}

interface MovieListResponse {
  currentPage: number
  results: any
  totalPages: number
  totalCount?: number
}

export type FetchMoviesFun = (
  filter?: FILTER,
  page?: number,
  searchOptions?: SearchOptions,
) => Promise<MovieListResponse>

export const fetchMovies: FetchMoviesFun = async (
  filter,
  page = 1,
  searchOptions,
) => {
  const BASE_URL = process.env.MOVIE_API_ROOT
  const commonParams = `?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR&region=KR&page=${page}`
  let filterPath = '/movie/popular'
  let moreFilter = ''

  switch (filter) {
    case 'HOT':
      filterPath = '/trending/movie/day'
      break
    case 'NOW_PLAYING':
      filterPath = '/movie/now_playing'
      break
    case 'UPCOMING':
      filterPath = '/discover/movie'
      break
    case 'GENRE':
      filterPath = '/discover/movie'
      break
    case 'SEARCH':
      filterPath = '/search/movie'
      moreFilter = `&query=${searchOptions?.keyword}&include_adult=false`
      break
    default:
      break
  }

  if (filter === 'UPCOMING') {
    const { date_gte, date_lte } = getDate()
    moreFilter = `&include_adult=false&include_video=false&release_date.gte=${date_gte}&release_date.lte=${date_lte}&sort_by=popularity.desc`
  }

  if (filter === 'GENRE') {
    moreFilter = `&include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=${searchOptions?.genreId}`
  }

  const URI = BASE_URL + filterPath + commonParams + moreFilter

  const res = await fetch(URI)
  console.log(URI)

  const {
    page: currentPage,
    results,
    total_pages,
    total_results,
  } = await res.json()
  return {
    currentPage,
    results,
    totalPages: total_pages,
    totalCount: total_results,
  }
}

export const fetchLikeMovies: FetchMoviesFun = async (_, page = 1) => {
  const session: any = await getServerSession(authOptions)

  const res = await fetch(`${process.env.API_ROOT}/api/likes?page=${page}`, {
    headers: { 'User-Id': session.user.id },
  })

  const {
    page: currentPage,
    results,
    total_pages,
  } = await res.json()
  return { currentPage, results, totalPages: total_pages }
}
