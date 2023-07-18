import MovieList from '@/app/components/MovieList'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotAllowed from '@/app/components/NotAllowed'

export default async function Likes() {
  let session: any = await getServerSession(authOptions)
  let likes
  
  if (session) {
    likes = await fetch(
      `http://localhost:3000/api/likes?userid=${session.user.id}&page=1`,
      { cache: 'no-store' },
    ).then((res) => res.json())
  }
  return session ? <MovieList movies={likes} filter={3} userId={session.user.id} /> : <NotAllowed />
}
