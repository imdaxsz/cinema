import { MOVIETYPE } from "@/app/types"

export const API_ROOT = 'http://localhost:3000/mpi'

export const MOVIE_LIST_TYPE: MOVIETYPE = {
  ALL: '전체',
  NOW_PLAYING: '🎞️지금 상영중인 영화💫',
  HOT: 'HOT',
  GENRE: '장르',
  UPCOMING: '📆개봉 예정 영화✨',
  SEARCH: '검색 결과',
  LIKE: '관심 영화',
}
