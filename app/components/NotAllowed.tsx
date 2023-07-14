'use client'

import { signIn } from 'next-auth/react'
import styles from '@/app/styles/my.module.css'

export default function NotAllowed() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className="flex-col fc-ac">
          <p className="inform">로그인이 필요합니다!</p>
          <button
            className="button"
            onClick={() => {
              signIn()
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}
