import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotAllowed from '../components/NotAllowed'
import MyPage from '../components/MyPage'

export default async function My() {
  let session: any = await getServerSession(authOptions)
  let list
  let more = true
  
  if (session) {
    const { results } = await fetch(
      `${process.env.API_ROOT}/api/likes?userid=${session.user.id}&page=1`,
      { cache: 'no-store' },
    ).then((res) => res.json())
    
    list = results.length > 4 ? results.slice(0, 5) : results
    more = results.length > 4
  }

    return session ? <MyPage user={session.user} likes={list} more={more} /> : <NotAllowed />
}
