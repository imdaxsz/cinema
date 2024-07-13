import styles from '../../styles/detail.module.css'
import Image from 'next/image'
import StillCut from '@/app/components/StillCut'
import Trailer from '@/app/components/Trailer'
import Like from '@/app/components/Like'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchMovie } from '../actions'

export default async function Detail(props: any) {
  const id = props.params.id[0]
  const session: any = await getServerSession(authOptions)

  const { info, people, posters, trailer, releaseDate } = await fetchMovie(id)
  const { poster_path, title, original_title, genres, runtime, overview } =
    info?.data

  let isLiked = false

  if (session) {
    const likeRes = await fetch(
      `${process.env.API_ROOT}/api/like?movieid=${id}`,
      { headers: { 'User-Id': session.user.id } },
    ).then((res) => res.json())
    isLiked = likeRes.isLiked
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.movie}>
          <div>
            <div className={styles.img}>
              <Image
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : '/default.png'
                }
                alt={title}
                fill
                sizes="50vw"
              />
            </div>
            <Like user={session?.user} movieId={id} isLiked={isLiked} />
          </div>
          <div className={styles.detail}>
            <div className={styles.title}>
              <strong>{title}</strong>
              <p>{original_title}</p>
            </div>
            <div className={styles.info}>
              <p>
                장르 : {genres[0] ? genres[0].name : '미정'} / {info?.country}
              </p>
              <p>러닝타임 : {runtime === 0 ? '미정' : `${runtime}분`}</p>
              <p>
                개봉 : {releaseDate ? releaseDate.replace(/\-/g, '.') : '미정'}
              </p>
              <p>감독 : {people?.director.name}</p>
              <p>
                출연 : {people?.cast[0].name}, {people?.cast[1].name}
              </p>
              <div className={styles.overview}>
                <span>{overview ?? '소개글 없음'}</span>
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
