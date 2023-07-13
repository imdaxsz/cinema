import { connectDB } from '@/util/database'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      // 1. 로그인 페이지 폼 자동 생성
      name: 'credentials',
      credentials: {
        id: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },

      // 2. 로그인 요청 시 실행
      async authorize(credentials) {
        if (credentials !== undefined) {
          let db = (await connectDB).db('cinema')
          let user = await db
            .collection('user_cred')
            .findOne({ id: credentials.id })
          if (!user) {
            console.log('해당 아이디가 없습니다.')
            return null
          }
          const pwcheck = await bcrypt.compare(
            credentials.password,
            user.password,
          )
          if (!pwcheck) {
            console.log('비밀번호가 틀렸습니다.')
            return null
          }
          return user as any
        }
      },
    }),
  ],

  // 3. jwt 설정
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60, // 로그인 유지 기간 (=3일)
  },

  callbacks: {
    // 4. jwt 만들 때 실행
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.user = {}
        token.user.id = user.id
        token.user.name = user.name
      }
      return token
    },
    // 5. 유저 세션이 조회될 때 마다 실행
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = token.user
      return session
    },
  },

  pages: {
    signIn: '/signin',
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)