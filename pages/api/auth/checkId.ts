import { connectDB } from '@/util/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const db = (await connectDB).db('cinema')
    console.log(req.body)
    let findResult = await db.collection('user_cred').findOne({ id: req.body })
    if (findResult) {
      return res.status(500).json('이미 사용중인 아이디입니다.')
    }
    return res.status(200).json('사용 가능한 아이디입니다.')
  }
  return res.status(405).json('method error')
}
