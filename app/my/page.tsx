import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotAllowed from '../components/NotAllowed'
import MyPage from '../components/MyPage'

export default async function My() {
  let session: any = await getServerSession(authOptions)
  return session ? (
    <>
      <MyPage user={session.user} />
    </>
  ) : (
    <NotAllowed />
  )
}
