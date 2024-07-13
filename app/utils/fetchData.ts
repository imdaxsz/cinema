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

// 한국 개봉 날짜 조회
export const getReleaseDate = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
  if (res) {
    const { results } = await res.json()
    const date = results.find((r: any) => r.iso_3166_1 === 'KR')?.release_dates
    const theater = date?.find((d: any) => d.type === 3)
    if (theater) return theater.release_date.split('T')[0]
    return null
  }
}
