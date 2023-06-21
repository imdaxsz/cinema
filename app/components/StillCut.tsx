'use client'
import styles from '../styles/moveslide.module.css'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { useState } from 'react'
import Image from 'next/image'

export default function StillCut({ images }: { images: any[] }) {
  const [num, setNum] = useState(0)

  const onBeforeClick = () => {
    if (num === 0) setNum(images.length-1)
    else setNum((prev) => prev - 1)
  }
  const onNextClick = () => {
    if (num === images.length-1) setNum(0)
    else setNum((prev) => prev + 1)
  }

  return (
    <div className={styles.wrapper}>
      <h3>포스터 · 스틸컷 ({num+1}/{images.length}) </h3>
      <div className={styles.content}>
        <div className={styles.stillcut}>
          <div className={styles.img}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${images[num].file_path}`}
              alt='image'
              fill
              sizes='50vw'
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <button
          onClick={onBeforeClick}
          className={`${styles.before} ${styles.arrow}`}
        >
          <SlArrowLeft className={styles.btn} />
        </button>
        <button
          onClick={onNextClick}
          className={`${styles.next} ${styles.arrow}`}
        >
          <SlArrowRight className={styles.btn} />
        </button>
      </div>
    </div>
  )
}
