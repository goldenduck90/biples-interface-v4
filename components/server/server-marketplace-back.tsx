'use client'

import { useRouter } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'

export const BackBtn = () => {
  const router = useRouter()

  const handleClick = (e: any) => {
    router.back()
    e.preventDefault()
  }

  return (
    <div className="icon-box flex h-[50px] w-[50px] cursor-pointer items-center justify-center hover:opacity-80">
      <MdArrowBack onClick={handleClick} />
    </div>
  )
}
