import styles from './styles/page.module.css'

async function fetchData() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR`,
    
  )
  const { results } = await res.json()
  return results
}

export default async function Home() {
  const results = await fetchData()
  return (
    <div className={styles.container}>
      {results?.map((movie: any) => (
        <div key={movie.id} className={styles.movie}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>{movie.title}</h4>
        </div>
      ))}
    </div>
  )
}
