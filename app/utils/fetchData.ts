// 영화 리스트 조회
export async function fetchData(option: string, genreId?: string) {
  let res
  if (option === 'hot') {
    res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR&page=1`,
      { next: { revalidate: 1800 } },
    )
  } else if (option === 'playing') {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
      { next: { revalidate: 43200 } },
    )
  } else if (option === 'upcoming') {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
      { next: { revalidate: 43200 } },
    )
  } else if (option === 'genres') {
    // 장르별 조회
    if (!genreId) {
      res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
        { next: { revalidate: 43200 } },
      )
    } else {
      res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&include_video=false&language=ko-KR&page=1&region=KR&sort_by=popularity.desc&with_genres=${genreId}`,
        { next: { revalidate: 43200 } },
      )
    }
  }
  if (res) {
    const { results, total_pages } = await res.json()
    return { results, total_pages }
  }
}

// 영화 검색
export const searchData = async (title: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${title}&include_adult=false&language=ko-KR&page=1`,
    { next: { revalidate: 43200 } },
  )
  if (res) {
    const { results, total_pages, total_results } = await res.json()
    return { results, total_pages, total_results }
  }
}

type MoreDataType = (
  filter: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setList: React.Dispatch<React.SetStateAction<any[]>>,
  title?: string,
) => void

// 영화 리스트 더보기
export const moreData: MoreDataType = async (
  filter,
  currentPage,
  setCurrentPage,
  setList,
  title,
) => {
  let res

  if (filter === 0) {
    // 현재 상영 영화 더보기
    res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=ko-KR&page=${currentPage + 1}&region=KR`,
      { next: { revalidate: 10 } },
    )
  } else if (filter === 1) {
    // 개봉 예정 영화 더보기
    res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=ko-KR&page=${currentPage + 1}&region=KR`,
      { next: { revalidate: 43200 } },
    )
  } else if (filter === 2) {
    // 장르 전체 영화 더보기
    res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=ko-KR&page=${currentPage + 1}&region=KR`,
      { next: { revalidate: 43200 } },
    )
  } else if (filter === 3) {
    res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&query=${title}&include_adult=false&language=ko-KR&page=${
        currentPage + 1
      }`,
      { next: { revalidate: 43200 } },
    )
  } else {
    // 장르별 영화 더보기
    res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&include_adult=false&include_video=false&language=ko-KR&page=${
        currentPage + 1
      }&region=KR&sort_by=popularity.desc&with_genres=${filter}`,
      { next: { revalidate: 43200 } },
    )
  }
  if (res) {
    await res.json().then((data) => {
      setList((prev) => [...prev, ...data.results])
      setCurrentPage((prev) => prev + 1)
    })
  }
}

// 영화 정보 상세 조회
export const getDetailData = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const data = await res.json()
    const country = await getCountry(data.production_countries[0].iso_3166_1)
    return { data, country }
  }
}

// 배우 및 감독 조회
export const getCastData = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const { cast, crew } = await res.json()
    const director = crew.find((e: any) => e.job === 'Director')
    return { cast, director }
  }
}

// 제작 국가명 조회
export const getCountry = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const result = await res.json()
    return result.find((e: any) => e.iso_3166_1 === id).native_name
  }
}

// 영화 포스터 조회
export const getImages = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_image_language=ko`,
  )
  if (res) {
    const { posters } = await res.json()
    return posters
  }
}

// 영화 트레일러 조회
export const getVideos = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const { results } = await res.json()
    return results
  }
}

// 장르명 조회
export const getGenre = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko`,
  )
  if (res) {
    const { genres } = await res.json()
    return genres.filter((g: any) => g.id === parseInt(id))[0].name
  }
}
