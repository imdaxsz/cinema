import { connectDB } from '@/util/database'
import { NextApiRequest, NextApiResponse } from 'next'
import bcyprt from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const result = JSON.parse(req.body)
    console.log('변경: ', result)
    const db = (await connectDB).db('cinema')
    let findResult = await db.collection('user_cred').findOne({ id: result.id })
    console.log(findResult)
    if (findResult) {
      if (result.currentPw === '')
        await db.collection('user_cred').updateOne({ id: result.id },{ $set: { name: result.name } })
      else {
        const match = await bcyprt.compare(result.currentPw, findResult.password)
        if (!match)
          return res.status(400).json('비밀번호 오류')
        
        const hash = await bcyprt.hash(result.newPw, 10)
        await db
          .collection('user_cred')
          .updateOne(
            { id: result.id },
            { $set: { name: result.name, password: hash } },
          )   
      }
      return res.status(200).json('변경 성공')
    } else return res.status(500).json('사용자를 찾을 수 없음')
  }
  return res.status(405).json('method error')
}
