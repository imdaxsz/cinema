import { db } from '@/util/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userid')
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '')
  const user = await db.collection('user_cred').findOne({ id: userId })

  if (user) {
    // FIX: TYPE
    let list: any[] = []
    const total_pages = Math.ceil(user.likes.length / 20)
    const end = user.likes.length < page * 20 ? user.likes.length : page * 20

    for (let i = 20 * (page - 1); i < end; i++) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${user.likes[i]}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
      )
      if (res) {
        const data = await res.json()
        const movie = {
          id: user.likes[i],
          title: data.title,
          poster_path: data.poster_path,
        }
        list = [...list, movie]
      }
    }

    const data = { total_pages, results: list }
    return NextResponse.json(data, { status: 200 })
  }

  return NextResponse.json(
    { error: '존재하지 않는 사용자입니다.' },
    { status: 404 },
  )
}
