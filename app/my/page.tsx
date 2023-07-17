import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotAllowed from '../components/NotAllowed'
import MyPage from '../components/MyPage'

export default async function My() {
  let session: any = await getServerSession(authOptions)
  let list

  if (session) {
    const likes = await fetch(
      `http://localhost:3000/api/likes?userid=${session.user.id}`,
    ).then((res) => res.json())
    list = likes.length > 4 ? likes.slice(0, 4) : likes
  }

  return session ? <MyPage user={session.user} likes={list} /> : <NotAllowed />
}
