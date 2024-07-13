import { getGenre } from '../../utils/fetchData'
import { fetchMovies } from '@/app/movies/actions'
import MovieList from '@/app/components/MovieList'

export default async function Genres(props: any) {
  const genre = await getGenre(props.params.genre[0])
  const { results, totalPages } = await fetchMovies('GENRE', 1, {
    genreId: props.params.genre[0],
  })

  return (
    <MovieList
      initialItems={results}
      totalPages={totalPages}
      fetchItems={fetchMovies}
      filter={'GENRE'}
      searchOptions={{ genreId: props.params.genre[0] }}
      genre={genre}
    />
  )
}
