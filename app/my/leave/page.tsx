import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import DeleteAccountForm from './Form'
import styles from '@/app/styles/my.module.css'

export default async function Leave() {
  const session: any = await getServerSession(authOptions)
  return (
    <div className={styles.wrapper}>
      <div className={styles['delete-account']}>
        <h4>회원 탈퇴</h4>
        <p>✔️ 탈퇴할 경우 복구가 불가능합니다.</p>
        <p>✔️ 탈퇴 후 회원정보 및 관심 영화 정보는 모두 삭제됩니다.</p>
        <DeleteAccountForm id={session.user.id} />
      </div>
    </div>
  )
}
