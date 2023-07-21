import { connectDB } from '@/util/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db('cinema')
  const findResult = await db.collection('user_cred').findOne({ id: req.query.userid })
  if (findResult) {
    let list: any[] = []
    const total_pages = Math.ceil(findResult.likes.length / 20)
    const page = parseInt(req.query.page as string)
    const end = findResult.likes.length < page*20 ? findResult.likes.length : page*20
    for (let i = 20*(page-1); i < end; i++){
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${findResult.likes[i]}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KR`,
      )
      if (res) {
        const data = await res.json()
        const movie = { id: findResult.likes[i], title: data.title, poster_path: data.poster_path }
        list = [...list, movie]
      }
    }
    const data = { total_pages, results: list }
    return res.status(200).json(data)
  } else return res.status(404).json('존재하지 않는 사용자입니다.')
}
