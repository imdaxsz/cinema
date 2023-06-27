import { fetchData, getGenre } from '../../utils/fetchData'
import MovieList from '../../components/MovieList'

export default async function Genres(props:any) {
  const movies = await fetchData('genres', props.params.genre[0])
  const genre = await getGenre(props.params.genre[0])

  return (
    <>
      <MovieList movies={movies} filter={props.params.genre[0]} genre={genre} />
    </>
  )
}
