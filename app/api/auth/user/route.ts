import bcyprt from 'bcrypt'
import { db } from '@/util/database'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// 회원 탈퇴
export async function DELETE(req: Request) {
  const { id, password } = await req.json()
  const searchResult = await db.collection('user_cred').findOne({ id })

  if (searchResult) {
    const match = await bcyprt.compare(password, searchResult.password)
    if (!match)
      return NextResponse.json(
        { error: '비밀번호 오류' },
        {
          status: 400,
        },
      )
    await db.collection('user_cred').deleteOne({ id })
    return NextResponse.json({ status: 200 })
  }

  return NextResponse.json(
    { error: '사용자를 찾을 수 없음' },
    {
      status: 404,
    },
  )
}

// 회원 정보 수정
export async function PATCH(req: Request) {
  const { id, name, currentPw, newPw } = await req.json()
  // const { id, name, currentPw } = result

  const searchResult = await db.collection('user_cred').findOne({ id })

  if (!searchResult)
    return NextResponse.json(
      { error: '사용자를 찾을 수 없음' },
      {
        status: 404,
      },
    )

  // 닉네임만 변경 시
  if (!currentPw && name) {
    await db.collection('user_cred').updateOne({ id }, { $set: { name } })
    return NextResponse.json({ status: 200 })
  }

  // 비밀번호 변경
  const match = await bcyprt.compare(currentPw, searchResult.password)
  if (!match)
    return NextResponse.json(
      { error: '비밀번호 오류' },
      {
        status: 400,
      },
    )

  const hash = await bcyprt.hash(newPw, 10)
  await db
    .collection('user_cred')
    .updateOne({ id }, { $set: { name, password: hash } })

  return NextResponse.json({ status: 200 })
}
