'use client'
import styles from '@/app/styles/my.module.css'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function SettingForm({ user }: { user: any }) {
  const [name, setName] = useState(user.name)
  const [currentPw, setcurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')

  const [blankName, setBlankName] = useState(false)
  const [currentPwError, setCurrentPwError] = useState(0)
  const [newPwError, setNewPwError] = useState(0)
  const [pwError, setPwError] = useState(0)

  const [change, setChange] = useState(false) // 정보에 변화가 있는지
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const pwErrorMessage = [
    '',
    '비밀번호: 8~16자의 영문, 숫자를 사용해 주세요. (특수문자 사용불가)',
    '현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다.',
    '비밀번호를 입력해주세요.',
    '비밀번호를 정확하게 입력해주세요.',
  ]

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(true)
    setName(e.target.value)
  }
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(true)
    setcurrentPw(e.target.value)
  }
  const onChangeNewPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPw(e.target.value)
  }

  const checkNewPw = () => {
    if (newPw !== '') {
      const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/
      if (passwordReg.test(newPw)) setNewPwError(0)
      else setNewPwError(1)
    }
    else setNewPwError(0)
  }

  const checkCurrentPw = () => {
    setCurrentPwError(0)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isBlankCurrentPw = currentPw.length <= 0 && newPw.length > 0
    const isBlankNewPw = newPw.length <= 0 && currentPw.length > 0
    const isSame = newPw === currentPw && newPw !==''
    if (isBlankCurrentPw) setCurrentPwError(3)
    if (isBlankNewPw) setNewPwError(3)
    if (isSame) setPwError(2)

    if (!blankName && newPwError === 0 && !isBlankCurrentPw && !isBlankNewPw && !isSame) {
      fetch('/api/auth/changeInfo', {
        method: 'POST',
        body: JSON.stringify({ id: user.id, name, newPw, currentPw }),
      }).then((res) => {
        if (res.status === 400)
          setPwError(4)
        else if (res.status === 200) {
          if (status === "authenticated") {
            update({ name })
          }
          window.alert('변경되었습니다.')
          router.refresh()
          router.push('/my')
        }
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={`${styles['info-wrapper']} ${styles.mb}`}>
          <p>아이디</p>
          <span>{user.id}</span>
        </div>
        <div className={styles['info-wrapper']}>
          <p>닉네임</p>
          <input
            name="id"
            type="text"
            value={name}
            onChange={onChangeName}
            onBlur={() => setBlankName(name.length <= 0)}
            placeholder="닉네임"
            className={`${styles.input} ${
              blankName ? styles['input-error'] : ''
            }`}
          />
        </div>
        <span className={blankName ? '' : `${styles.hidden}`}>
          닉네임을 입력해주세요.
        </span>
        <h3>비밀번호 재설정</h3>
        <input
          name="currentPw"
          type="password"
          value={currentPw}
          onChange={onChangePw}
          onBlur={checkCurrentPw}
          placeholder="현재 비밀번호"
          className={`${styles.input} ${
            currentPwError !== 0 ? styles['input-error'] : ''
          }`}
        />
        <span>{pwErrorMessage[currentPwError]}</span>
        <input
          name="newPw"
          type="password"
          value={newPw}
          onChange={onChangeNewPw}
          onBlur={checkNewPw}
          placeholder="새 비밀번호"
          className={`${styles.input} ${
            newPwError !== 0 ? styles['input-error'] : ''
          }`}
        />
        <span>{pwErrorMessage[newPwError]}</span>
        <span>{pwErrorMessage[pwError]}</span>
        <button type="submit" disabled={!change}>
          변경사항 저장
        </button>
      </form>
    </div>
  )
}
