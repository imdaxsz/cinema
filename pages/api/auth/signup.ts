import { connectDB } from '@/util/database'
import { NextApiRequest, NextApiResponse } from 'next'
import bcyprt from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const result = JSON.parse(req.body)
    console.log(result)
    const db = (await connectDB).db('cinema')
    let findResult = await db
      .collection('user_cred')
      .findOne({ id: result.id })
    
    if (!findResult && result.password) {
      const hash = await bcyprt.hash(result.password, 10)
      result.password = hash
      result.likes = []
      await db.collection('user_cred').insertOne(result)
      return res.status(200).json('가입 성공')
    } else 
      return res.status(500).json('가입 오류')
  }
  return res.status(405).json('method error')
}
