import {
  getDetailData,
  getCastData,
  getImages,
  getVideos,
} from '@/app/utils/fetchData'
import styles from '../../styles/detail.module.css'
import Image from 'next/image'
import StillCut from '@/app/components/StillCut'
import Trailer from '@/app/components/Trailer'

export default async function Detail(props: any) {
  const id = props.params.id[0]
  const result = await getDetailData(id)
  const movie = result?.data
  const people = await getCastData(id)
  const posters = await getImages(id)
  const trailer = await getVideos(id)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.movie}>
          <div className={styles.img}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="50vw"
            />
          </div>
          <div className={styles.detail}>
            <div className={styles.title}>
              <strong>{movie.title}</strong>
              <p>{movie.original_title}</p>
            </div>
            <div className={styles.info}>
              <p>
                장르 : {movie.genres[0].name} / {result?.country}
              </p>
              <p>러닝타임 : {movie.runtime}분</p>
              <p>개봉 : {movie.release_date}</p>
              <p>감독 : {people?.director.name}</p>
              <p>
                출연 : {people?.cast[0].name}, {people?.cast[1].name}
              </p>
              <div className={styles.overview}>
                <span>{movie.overview}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.media}>
          {trailer.length > 0 && <Trailer videos={trailer} />}
          {posters.length > 0 && <StillCut images={posters} />}
        </div>
      </div>
    </div>
  )
}
