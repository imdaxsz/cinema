'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/app/styles/my.module.css'

export default function Register() {
  const router = useRouter()

  const [validateId, setValidateId] = useState<boolean | null>(null)
  const [isDuplicated, setIsDuplicated] = useState(false)
  const [validatePw, setValidatePw] = useState<boolean | null>(null)
  const [validateName, setValidateName] = useState<boolean | null>(null)
  const [message, setMessage] = useState('')
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const checkId = async () => {
    setIsDuplicated(false)
    const idReg = /^(?=.*[a-z])[a-z0-9_-]{5,20}$/
    const isIdValidate = idReg.test(id);
    setValidateId(isIdValidate)

    if (isIdValidate) {
      const res = await fetch('/api/auth/check', { method: 'POST', body: JSON.stringify({ id }) })
      if (res.status === 409) {
        setIsDuplicated(true)
        setMessage('이미 사용중인 아이디입니다.')
      }
    }
  }

  const checkPassword = () => {
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/
    if (passwordReg.test(password)) setValidatePw(true)
    else setValidatePw(false)
  }

  const checkName = () => {
    if (name.length <= 0) setValidateName(false)
    else setValidateName(true)
  }

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateId) setValidateId(false)
    else if (name.length === 0) setValidateName(false)
    else if (!validatePw) setValidatePw(false)
    if (validateId && validatePw && !isDuplicated && name.length > 0)
      fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ id, name, password }),
      }).then(() => {
        window.alert('가입이 완료되었습니다!')
        router.push('/signin')
      })
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          name="id"
          type="text"
          value={id}
          onChange={onChangeId}
          onBlur={checkId}
          placeholder="아이디"
          className={`${styles.input} ${
            validateId === false || isDuplicated ? styles['input-error'] : ''
          }`}
        />
        {id.length <= 0 && validateId === false && (
          <span>아이디를 입력해주세요.</span>
        )}
        {id.length > 0 && validateId === false && !isDuplicated && (
          <span>
            아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용
            가능합니다.
          </span>
        )}
        {isDuplicated && <span>{message}</span>}
        <input
          name="name"
          type="text"
          value={name}
          onChange={onChangeName}
          placeholder="닉네임"
          onBlur={checkName}
          className={`${styles.input} ${
            validateName === false ? styles['input-error'] : ''
          }`}
        />
        {validateName === false && <span>닉네임을 입력해주세요.</span>}
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChangePw}
          onBlur={checkPassword}
          placeholder="비밀번호"
          autoComplete="off"
          className={`${styles.input} ${
            validatePw === false ? styles['input-error'] : ''
          }`}
        />
        {password.length <= 0 && validatePw === false && (
          <span>비밀번호를 입력해주세요.</span>
        )}
        {password.length > 0 && validatePw === false && (
          <span>
            비밀번호: 8~16자의 영문, 숫자를 사용해 주세요. (특수문자 사용불가)
          </span>
        )}
        <button type="submit">회원 가입</button>
      </form>
    </div>
  )
}
