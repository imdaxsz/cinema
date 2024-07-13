import { fetchMovies } from '../movies/actions'
import MovieList from '../components/MovieList'

export const dynamic = 'force-dynamic'

export default async function UpComing() {
  const { results, totalPages } = await fetchMovies('UPCOMING')

  return (
    <MovieList
      initialItems={results}
      totalPages={totalPages}
      fetchItems={fetchMovies}
      filter={'UPCOMING'}
    />
  )
}
