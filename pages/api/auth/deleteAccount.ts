import bcyprt from 'bcrypt';
import { connectDB } from '@/util/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const result = JSON.parse(req.body)
    const db = (await connectDB).db('cinema')
    let findResult = await db.collection('user_cred').findOne({ id: result.id })
    if (findResult) {
      const match = await bcyprt.compare(result.password, findResult.password)
      if (!match) return res.status(400).json('비밀번호 오류')
      await db.collection('user_cred').deleteOne({ id: result.id })
      return res.status(200).json('사용자 삭제 완료')
    } else return res.status(404).json('사용자를 찾을 수 없음')
  }
  return res.status(405).json('method error')
}
