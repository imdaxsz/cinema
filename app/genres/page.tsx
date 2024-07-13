import { fetchMovies } from '../movies/actions'
import MovieList from '../components/MovieList'

export const dynamic = 'force-dynamic'

export default async function Genres() {
  const { results, totalPages } = await fetchMovies('ALL')

  return (
    <MovieList
      initialItems={results}
      totalPages={totalPages}
      fetchItems={fetchMovies}
      filter={'ALL'}
    />
  )
}
