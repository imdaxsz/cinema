import { db } from '@/util/database'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { id } = await req.json()
  const searchResult = await db.collection('user_cred').findOne({ id })
  
  if (searchResult) {
    return NextResponse.json({error: '이미 사용중인 아이디입니다.'}, { status: 409 })
  }

  return NextResponse.json({ status: 200 })
}
