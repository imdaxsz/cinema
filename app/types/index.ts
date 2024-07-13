export type FILTER = 'ALL' | 'NOW_PLAYING' | 'HOT' | 'GENRE' | 'UPCOMING' | 'SEARCH' | 'LIKE'

export interface MOVIETYPE extends Record<FILTER, string> {}