import { fetchData } from '../utils/fetchData'
import MovieList from '../components/MovieList'

export default async function UpComing() {
  const movies = await fetchData('playing')

  return (
    <>
      <MovieList movies={movies} filter={0} />
    </>
  )
}
