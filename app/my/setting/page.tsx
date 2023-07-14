import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import SettingForm from '@/app/components/SettingForm'
import NotAllowed from '@/app/components/NotAllowed'

export default async function Setting() {
  let session: any = await getServerSession(authOptions)
  return session ? <SettingForm user={session.user} /> : <NotAllowed />
}
