'use client'

import styles from '@/app/styles/detail.module.css'
import { useEffect, useState } from 'react'
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri'
import { BeatLoader } from 'react-spinners'

interface LikeProps {
  user: any | null
  movieId: string
}

export default function Like({ user, movieId }: LikeProps) {
  const [like, setLike] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/likes?userid=${user.id}&movieid=${movieId}`)
      .then((res) => res.json())
      .then((result) => {
        setLike(result)
        setLoading(false)
      })
  }, [])

  const onClick = () => {
    if (!user) window.alert('관심 영화 추가는 로그인 후 가능합니다!')
    else {
      // 추가 또는 삭제
      fetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify({ id: user.id, movieid: movieId }),
      }).then((res) => {
        if (res.status === 200) setLike((prev) => !prev)
      })
    }
  }

  return (
    <div className={`flex ${styles.like}`} onClick={onClick}>
      {!loading ? (
        <>
          {like ? (
            <RiHeart3Fill color="#fb5180" size="24px" />
          ) : (
            <RiHeart3Line size="24px" />
          )}
        </>
      ) : (
        <BeatLoader loading={loading} size={2} color="#777" />
      )}
      <p>관심</p>
    </div>
  )
}
