'use client'
import styles from '@/app/styles/my.module.css'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [blankPw, setBlankPw] = useState(false)
  const [blankId, setBlankId] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (id.length <= 0)
      setBlankId(true)
    if (password.length <= 0)
      setBlankPw(true)
    if (!blankId && !blankPw) {
      await signIn("credentials", {
        id: id,
        password: password,
        redirect: false,
      }).then((result) => {
        console.log(result)
        if (result?.ok)
          router.push('/')
        if (result?.error)
          setError(true)
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          name="id"
          type="text"
          value={id}
          onChange={onChangeId}
          onBlur={() => setBlankId(id.length <= 0)}
          placeholder="아이디"
          className={`${styles.input} ${blankId ? styles['input-error'] : ''}`}
        />
        {blankId && <span>아이디를 입력해주세요.</span>}
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChangePw}
          onBlur={() => setBlankPw(password.length <= 0)}
          autoComplete="off"
          placeholder="비밀번호"
          className={`${styles.input} ${blankPw ? styles['input-error'] : ''}`}
        />
        {blankPw && <span>비밀번호를 입력해주세요.</span>}
        {error && (
          <span>
            아이디 또는 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.
          </span>
        )}
        <button type="submit">로그인</button>
        <Link href="/register">회원가입</Link>
      </form>
    </div>
  )
}
