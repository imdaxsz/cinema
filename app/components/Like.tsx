'use client'

import styles from '@/app/styles/detail.module.css'
import { useState } from 'react'
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri'

interface LikeProps {
  user: any | null
  movieId: string
  isLiked: boolean
}

export default function Like({ user, movieId, isLiked }: LikeProps) {
  const [like, setLike] = useState(isLiked)

  const onClick = async () => {
    if (!user) {
      window.alert('관심 영화 추가는 로그인 후 가능합니다!')
      return
    }

    const res = await fetch('/api/like', {
      method: 'POST',
      body: JSON.stringify({ id: user.id, movieId }),
    })

    if (res.status === 200) setLike((prev) => !prev)
  }

  return (
    <div className={`flex ${styles.like}`} onClick={onClick}>
      {like ? (
        <RiHeart3Fill color="#fb5180" size="24px" />
      ) : (
        <RiHeart3Line size="24px" />
      )}
      <p>관심</p>
    </div>
  )
}
