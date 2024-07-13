import SearchResult from '../components/SearchResult'
import { fetchMovies } from '../movies/actions'

export const dynamic = 'force-dynamic'

export default async function Search(props: any) {
  const keyword = props.searchParams.query
  const { results, totalPages, totalCount } = await fetchMovies('SEARCH', 1, {
    keyword,
  })

  return (
    <SearchResult
      keyword={keyword}
      initialItems={results}
      totalPages={totalPages}
      fetchItems={fetchMovies}
      totalCount={totalCount ?? 0}
    />
  )
}
