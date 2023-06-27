export async function fetchData(option: string, genreId?:string) {
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
    if (!genreId){
      res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
      { next: { revalidate: 43200 } },
    )
    } else {
      res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&include_video=false&language=ko-KR&page=1&region=KR&sort_by=popularity.desc&with_genres=${genreId}`,{ next: { revalidate: 43200 } },)
    }
  }
  if (res) {
    const { results, total_pages } = await res.json()
    return { results, total_pages }
  }
}

export const getDetailData = async (id: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`)
  if (res){
    const data = await res.json()
    const country = await getCountry(data.production_countries[0].iso_3166_1)
    return {data, country}
  }
}

export const getCastData = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=ko-KR`
  )
  if (res) {
    const { cast, crew } = await res.json()
    const director = crew.find((e: any) => e.job === "Director")
    return { cast, director }
  }
}

type MoreDataType = (
  filter: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setList: React.Dispatch<React.SetStateAction<any[]>>,
) => void

export const moreData: MoreDataType = async (
  filter,
  currentPage,
  setCurrentPage,
  setList,
) => {
  let res

  if (filter === 0) {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=ko-KR&page=${currentPage + 1}&region=KR`,
      { next: { revalidate: 10 } },
    )
  } else if (filter === 1) {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=ko-KR&page=${currentPage + 1}&region=KR`,
      { next: { revalidate: 43200 } },
    )
  } else if (filter === 2) {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=ko-KR&page=${currentPage + 1}&region=KR`,
      { next: { revalidate: 43200 } },
    )
  } else {
    res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&include_video=false&language=ko-KR&page=${currentPage + 1}&region=KR&sort_by=popularity.desc&with_genres=${filter}`,
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

export const getCountry = async (id: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`)
  if (res) {
    const result = await res.json()
    return result.find((e:any)=>e.iso_3166_1 === id).native_name
  }
}

export const getImages = async (id:string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_image_language=ko`)
  if (res) {
    const { posters } = await res.json()
    return posters
  }
}

export const getVideos = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
  )
  if (res) {
    const { results } = await res.json() 
    return results
  }
}

export const getGenre = async (id: string) => {
  const res = await fetch(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko`
  )
  if (res) {
    const { genres } = await res.json()
    return genres.filter((g:any)=>g.id === parseInt(id))[0].name
  }
}