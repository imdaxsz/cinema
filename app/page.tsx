import MovieSlide from './components/MovieSlide'
import { fetchData } from './utils/fetchData'

export const dynamic = 'force-dynamic' 

export default async function Home() {
  const hot = await fetchData('hot')
  const nowPlaying = await fetchData('playing')
  return (
    <>
      <MovieSlide filter="🔥HOT🔥" movies={hot?.results} />
      <MovieSlide filter="🎞️지금 상영중인 영화💫" movies={nowPlaying?.results} />
      <div style={{marginTop: '40px'}}></div>
    </>
  )
}
