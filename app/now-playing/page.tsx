import { fetchData } from '../utils/fetchData'
import MovieList from '../components/MovieList'

export const dynamic = 'force-dynamic' 

export default async function NowPlaying() {
  const movies = await fetchData('playing')

  return (
    <>
      <MovieList movies={movies} filter={0} />
    </>
  )
}
