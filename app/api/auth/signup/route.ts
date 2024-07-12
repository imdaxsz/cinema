import { db } from '@/util/database'
import { NextResponse } from 'next/server'
import bcyprt from 'bcrypt'

export async function POST(req: Request) {
  const userInfo = await req.json()

  let searchResult = await db
    .collection('user_cred')
    .findOne({ id: userInfo.id })

  if (!searchResult && userInfo.password) {
    const hash = await bcyprt.hash(userInfo.password, 10)
    const user = { ...userInfo, password: hash, likes : []}
    await db.collection('user_cred').insertOne(user)
    return NextResponse.json({ status: 200 })
  } 
  return NextResponse.json({ error: '가입 오류' }, { status: 500 })
}
