'use client'
import styles from '../styles/moveslide.module.css'

export default function Trailer({videos}:{videos:any[]}) {
  return (
    <div className={styles.wrapper}>
      <h3>
        트레일러 
      </h3>
      <div className={styles.content}>
        <div className={styles.trailer}>
        <iframe
          width="920"
          height="460"
          src={`https://www.youtube.com/embed/${videos[0].key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        </div>
      </div>
    </div>
  )
}
