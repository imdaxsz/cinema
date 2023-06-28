'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="not-found">
      <h2>404 Not Found</h2>
      <p>요청하신 페이지를 찾을 수 업습니다.</p>
      <div className='flex'>
        <Link href="/">Cinema 홈</Link>
        <span onClick={() => { router.back() }}>이전 페이지</span>
      </div>
    </div>
  )
}
