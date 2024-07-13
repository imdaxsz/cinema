'use client'

import styles from '@/app/styles/my.module.css'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export default function DeleteAccountForm({ id }: { id: string }) {
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!agree) {
      window.alert('회원 탈퇴 동의를 체크해 주세요.')
      return
    }
    const res = await fetch('/api/auth/user', {
      method: 'DELETE',
      body: JSON.stringify({ id, password }),
    })

    if (res.status === 400) {
      window.alert('비밀번호를 다시 확인하세요.')
      return
    }

    if (res.status === 200) {
      window.alert('탈퇴 완료되었습니다.')
      signOut({ callbackUrl: '/' })
    }
  }

  return (
    <div>
      <div className={styles.message}>
        <input type="checkbox" onChange={onChangeCheck} />
        <span>&nbsp; 위 내용을 이해했으며, 모두 동의합니다.</span>
      </div>
      <strong>본인 확인을 위해 {id} 계정의 비밀번호를 입력해주세요.</strong>
      <form onSubmit={onSubmit} className={styles.pform}>
        <input
          name="currentPw"
          type="password"
          value={password}
          onChange={onChangePw}
          placeholder="비밀번호 입력"
          className={`${styles.input}`}
        />
        <button type="submit">회원 탈퇴</button>
      </form>
    </div>
  )
}
