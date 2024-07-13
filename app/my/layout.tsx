import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import NotAllowed from "../components/NotAllowed"

export default async function MyLayout({ children }: { children: React.ReactNode }) {
  const session: any = await getServerSession(authOptions)

  return session ? <>{children}</> : <NotAllowed />
}
