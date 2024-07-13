import MovieSlide from './components/MovieSlide'
import { fetchMovies } from './movies/actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { results: hot } = await fetchMovies('HOT')
  const { results: nowPlaying } = await fetchMovies('NOW_PLAYING')

  return (
    <>
      <MovieSlide filter="🔥HOT🔥" movies={hot} />
      <MovieSlide
        filter="🎞️지금 상영중인 영화💫"
        movies={nowPlaying}
      />
      <div style={{ marginTop: '40px' }}></div>
    </>
  )
}
