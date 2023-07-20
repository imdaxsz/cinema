import { connectDB } from '@/util/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session: any = await getServerSession(req, res, authOptions)
  
  if (req.method === 'POST') {
    const db = (await connectDB).db('cinema')
    const result = JSON.parse(req.body)
    const findResult = await db
      .collection('user_cred')
      .findOne({ id: result.id })
    if (findResult) {
      const likeResult = findResult.likes.includes(result.movieid)
      if (likeResult) {
        const likes = findResult.likes.filter(
          (id: string) => id !== result.movieid,
        )
        await db
          .collection('user_cred')
          .updateOne({ id: result.id }, { $set: { likes } })
        return res.status(200).json('좋아요 삭제 완료')
      } else {
        const likes = [...findResult.likes, result.movieid]
        await db
          .collection('user_cred')
          .updateOne({ id: result.id }, { $set: { likes } })
        return res.status(200).json('좋아요 추가 완료')
      }
    }
    return res.status(404).json('존재하지 않는 사용자입니다.')
  }
  if (req.method === 'GET') {
    if (!session) return res.status(200).json(false)
    const db = (await connectDB).db('cinema')
    const findResult = await db
      .collection('user_cred')
      .findOne({ id: session.user.id })
    if (findResult) {
      const likeResult = findResult.likes.includes(req.query.movieid)
      return res.status(200).json(likeResult)
    }
  }
  return res.status(405).json('method error')
}
