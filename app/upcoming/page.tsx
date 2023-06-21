import { fetchData } from '../utils/fetchData'
import MovieList from '../components/MovieList'

export default async function UpComing() {
  const movies = await fetchData('upcoming')

  return (
    <>
      <MovieList movies={movies} filter={1} />
    </>
  )
}
