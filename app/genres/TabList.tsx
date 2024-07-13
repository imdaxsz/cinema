'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Tablist() {
  const pathname = usePathname()
  let path: string[] = []
  if (pathname) {
    path = pathname.split("/")
  }
  return (
    <ul className="tablist">
      <li className={path.length === 2 ? 'selected' : ''}>
        <Link href={`/genres`}>전체</Link>
      </li>
      <li className={path[2] === '28' ? 'selected' : ''}>
        <Link href={`/genres/28/action`}>액션</Link>
      </li>
      <li className={path[2] === '35' ? 'selected' : ''}>
        <Link href={`/genres/35/comedy`}>코미디</Link>
      </li>
      <li className={path[2] === '10749' ? 'selected' : ''}>
        <Link href={`/genres/10749/romance`}>로맨스</Link>
      </li>
      <li className={path[2] === '878' ? 'selected' : ''}>
        <Link href={`/genres/878/sf`}>SF</Link>
      </li>
      <li className={path[2] === '14' ? 'selected' : ''}>
        <Link href={`/genres/14/fantasy`}>판타지</Link>
      </li>
      <li className={path[2] === '12' ? 'selected' : ''}>
        <Link href={`/genres/12/adventure`}>모험</Link>
      </li>
      <li className={path[2] === '16' ? 'selected' : ''}>
        <Link href={`/genres/16/animation`}>애니메이션</Link>
      </li>
      <li className={path[2] === '53' ? 'selected' : ''}>
        <Link href={`/genres/53/thriller`}>스릴러</Link>
      </li>
      <li className={path[2] === '27' ? 'selected' : ''}>
        <Link href={`/genres/27/horror`}>공포</Link>
      </li>
      <li className={path[2] === '99' ? 'selected' : ''}>
        <Link href={`/genres/99/documentary`}>다큐멘터리</Link>
      </li>
      <li className={path[2] === '36' ? 'selected' : ''}>
        <Link href={`/genres/36/history`}>역사</Link>
      </li>
      <li className={path[2] === '10402' ? 'selected' : ''}>
        <Link href={`/genres/10402/music`}>음악</Link>
      </li>
      <li className={path[2] === '37' ? 'selected' : ''}>
        <Link href={`/genres/37/western`}>서부</Link>
      </li>
    </ul>
  )
}
