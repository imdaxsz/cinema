import MovieList from '../components/MovieList'
import { fetchMovies } from '../movies/actions'

export const dynamic = 'force-dynamic'

export default async function NowPlaying() {
  const { results, totalPages } = await fetchMovies('NOW_PLAYING')

  return (
    <MovieList
      initialItems={results}
      totalPages={totalPages}
      fetchItems={fetchMovies}
      filter={'NOW_PLAYING'}
    />
  )
}
