'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

interface NavigationItemProps {
  id: string
  imageUrl: string
  name: string
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams()
  const router = useRouter()

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-[165px] items-center  rounded-[15px] border transition-all hover:border-[#50FFFF]/80',
        params?.serverId === id ? 'border-[#50FFFF]/10' : 'border-[#50FFFF]/10',
      )}
    >
      <div
        className={cn(
          'absolute bottom-0 left-1/2 w-1/2 -translate-x-1/2 rounded-t-full bg-[#50FFFF] transition-all',
          params?.serverId !== id && 'group-hover:border',
          params?.serverId === id ? 'h-[3px]' : 'h-0',
        )}
      />
      <div
        className={
          '$ group relative mx-3 flex h-[48px] items-center justify-center gap-2.5 overflow-hidden rounded-[16px] transition-all'
        }
      >
        {/* <Icon
          icon="solar:verified-check-bold"
          color="#42a5f5"
          className="absolute h-2.5 w-2.5 top-1 right-0"
        /> */}
        <Image
          className="aspect-square h-[20px] w-[20px] rounded-full object-cover"
          src={imageUrl}
          width={20}
          height={20}
          alt="Channel"
        />
        <p className="text-sm font-medium">{name}</p>
      </div>
    </button>
  )
}
