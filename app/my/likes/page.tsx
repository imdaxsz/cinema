import MovieList from '@/app/components/MovieList'
import { fetchLikeMovies } from '@/app/movies/actions'

export default async function Likes() {
  const { results, totalPages } = await fetchLikeMovies()

  return (
    <MovieList
      initialItems={results}
      totalPages={totalPages}
      fetchItems={fetchLikeMovies}
      filter={'LIKE'}
    />
  )
}
