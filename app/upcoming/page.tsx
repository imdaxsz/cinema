import { fetchData } from '../utils/fetchData'
import MovieList from '../components/MovieList'

export const dynamic = 'force-dynamic' 

export default async function UpComing() {
  const movies = await fetchData('upcoming')

  return (
    <>
      <MovieList movies={movies} filter={1} />
    </>
  )
}
