import SearchResult from "../components/SearchResult"
import { searchData } from "../utils/fetchData"

export default async function Search(props: any) {
  const movies = await searchData(props.searchParams.query)
  return (
    <div>
      <SearchResult movies={movies} />
    </div>
  )
}
