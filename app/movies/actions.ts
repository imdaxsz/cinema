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


/**
 * @description 영화 목록 조회
 * @param {FILTER} filter
 * @param {number} page 
 * @param {SearchOptions} searchOptions 키워드 또는 장르 아이디
 * @returns 영화 목록
 */
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


/**
 * @description 관심 영화 목록 조회
 * @param _ 
 * @param {number} page 
 * @returns 영화 목록
 */
export const fetchLikeMovies: FetchMoviesFun = async (_, page = 1) => {
  const session: any = await getServerSession(authOptions)

  const res = await fetch(`${process.env.API_ROOT}/api/likes?page=${page}`, {
    headers: { 'User-Id': session.user.id },
  })

  const { page: currentPage, results, total_pages } = await res.json()
  return { currentPage, results, totalPages: total_pages }
}


/**
 * @description 영화 상세 정보 조회
 * @param {string} id 
 * @returns 영화 정보
 */
export const fetchMovie = async (id: string) => {
  const info = await getDetailData(id)
  const people = await getCastData(id)
  const posters = await getImages(id)
  const trailer = await getVideos(id)
  const releaseDate = await getReleaseDate(id)

  return { info, people, posters, trailer, releaseDate }
}


// 영화 정보 상세 조회
export const getDetailData = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const data = await res.json()
    const country = await getCountry(data.production_countries[0].iso_3166_1)
    return { data, country }
  }
}

// 배우 및 감독 조회
export const getCastData = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const { cast, crew } = await res.json()
    const director = crew.find((e: any) => e.job === 'Director')
    return { cast, director }
  }
}

// 제작 국가명 조회
export const getCountry: (id: string) => Promise<string> = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const result = await res.json()
    return result.find((e: any) => e.iso_3166_1 === id).native_name
  }
}

// 영화 포스터 조회
export const getImages: (id: string) => Promise<string[]> = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_image_language=ko`,
  )
  if (res) {
    const { posters } = await res.json()
    return posters
  }
}

// 영화 트레일러 조회
export const getVideos: (id: string) => Promise<string[]> = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const { results } = await res.json()
    return results
  }
}

// 장르명 조회
export const getGenre: (id: string) => Promise<string> = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko`,
  )
  if (res) {
    const { genres } = await res.json()
    return genres.filter((g: any) => g.id === parseInt(id))[0].name
  }
}

// 한국 개봉 날짜 조회
export const getReleaseDate: (id: string) => Promise<string | null> = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
  if (res) {
    const { results } = await res.json()
    const date = results.find((r: any) => r.iso_3166_1 === 'KR')?.release_dates
    const theater = date?.find((d: any) => d.type === 3)
    if (theater) return theater.release_date.split('T')[0]
    return null
  }
}
