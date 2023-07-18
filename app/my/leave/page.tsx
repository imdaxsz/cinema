import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotAllowed from '@/app/components/NotAllowed'
import DeleteAccountForm from '@/app/components/DeleteAccountForm'

export default async function DeleteAccount() {
  let session: any = await getServerSession(authOptions)
  return session ? <DeleteAccountForm id={session.user.id} /> : <NotAllowed />
}
