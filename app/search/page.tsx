import SearchResult from "../components/SearchResult"
import { searchData } from "../utils/fetchData"

export const dynamic = 'force-dynamic' 

export default async function Search(props: any) {
  const movies = await searchData(props.searchParams.query)
  return (
    <div>
      <SearchResult movies={movies} />
    </div>
  )
}
