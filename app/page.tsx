import MovieSlide from './components/MovieSlide'

async function fetchData(option: string) {
  let res
  if (option === 'hot') {
    res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}&language=ko-KR&page=1`,
      { next: { revalidate: 1800 } },
    )
  } else if (option === 'playing') {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=ko-KR&page=1&region=KR`,
      { next: { revalidate: 43200 } },
    )
  }
  if (res) {
    const { results } = await res.json()
    return results
  }
}

export default async function Home() {
  const hot = await fetchData('hot')
  const nowPlaying = await fetchData('playing')
  return (
    <>
      <MovieSlide filter="🔥HOT🔥" movies={hot} />
      <MovieSlide filter="🎞️지금 상영중인 영화💫" movies={nowPlaying} />
    </>
  )
}
