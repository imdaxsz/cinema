import { db } from '@/util/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// 사용자의 영화 좋아요 여부
export async function GET(req: NextRequest) {
  const session: any = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ isLiked: false }, { status: 200 })

  const findUserResult = await db
    .collection('user_cred')
    .findOne({ id: session.user.id })

  if (findUserResult) {
    const movieId = req.nextUrl.searchParams.get('movieid')
    const isLiked = findUserResult.likes.includes(movieId)
    return NextResponse.json({ isLiked }, { status: 200 })
  }
}

// 좋아요 추가/삭제
export async function POST(req: Request) {
  const { id, movieId } = await req.json()
  const findUserResult = await db.collection('user_cred').findOne({ id })

  if (findUserResult) {
    const likeResult = findUserResult.likes.includes(movieId)

    if (likeResult) {
      const likes = findUserResult.likes.filter((id: string) => id !== movieId)
      await db.collection('user_cred').updateOne({ id }, { $set: { likes } })
      return NextResponse.json({ status: 200 })
    }

    const likes = [...findUserResult.likes, movieId]
    await db.collection('user_cred').updateOne({ id }, { $set: { likes } })

    return NextResponse.json({ status: 200 })
  }

  return NextResponse.json(
    { error: '존재하지 않는 사용자입니다.' },
    { status: 404 },
  )
}
