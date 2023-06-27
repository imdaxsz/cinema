import { fetchData } from '../utils/fetchData'
import MovieList from '../components/MovieList'

export default async function Genres() {
  const movies = await fetchData('genres')

  return (
    <>
      <MovieList movies={movies} filter={2} />
    </>
  )
}
