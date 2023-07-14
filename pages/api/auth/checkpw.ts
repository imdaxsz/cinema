import bcyprt from 'bcrypt';
import { connectDB } from '@/util/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const result = JSON.parse(req.body)
    console.log(result)
    const db = (await connectDB).db('cinema')
    let findResult = await db.collection('user_cred').findOne({ id: result.id })
    if (findResult) {
      const hash = await bcyprt.hash(result.password, 10)
      console.log(findResult)
      return res.status(200).json('사용자 찾음')
    } else return res.status(500).json('사용자를 찾을 수 없음')
  }
  return res.status(405).json('method error')
}
