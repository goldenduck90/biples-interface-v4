'use client'

import React from 'react'
import { RiHome6Fill } from 'react-icons/ri'
import { IoMdChatbubbles } from 'react-icons/io'
import { HiMiniUsers } from 'react-icons/hi2'
import { RiNftFill } from 'react-icons/ri'
import { MdStore } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ProfileDrawer } from './profil-drawer-server'
import { cn } from '@/lib/utils'

const LeftSidebarMenuItemsList: React.FC = () => {
  const pathname = usePathname()

  const progress = 70

  //@ts-ignore
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path || pathname!.startsWith('/servers')
    }
    return pathname!.startsWith(path)
  }

  const menuItems = [
    { name: 'Home', icon: RiHome6Fill, path: '/home' },
    { name: 'Community', icon: FaUsers, path: '/' },
    { name: 'Chats', icon: IoMdChatbubbles, path: '/chats' },
    { name: 'Friends', icon: HiMiniUsers, path: '/friends' },
    { name: 'My NFTs', icon: RiNftFill, path: '/my-nfts' },
    { name: 'Marketplace', icon: MdStore, path: '/marketplace' },
  ]

  return (
    <div className="relative flex flex-col gap-6 p-5">
      {menuItems.map((item) => {
        const active = isActive(item.path)
        return (
          <Link
            href={item.path}
            key={item.name}
            className={`text-md flex  cursor-pointer items-center gap-3 font-medium text-white hover:opacity-80`}
            style={{ borderRadius: active ? '10px' : '' }}
          >
            {active && (
              <div className="absolute left-0 h-[36px] w-[4px] rounded-r-lg bg-[#50FFFF]"></div>
            )}
            <div
              className={cn(
                'pl-2',
                active &&
                  'shadow-blue flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#50FFFF] pl-0',
              )}
            >
              <item.icon
                size="16"
                className={`${active ? 'text-black' : 'text-white'}`}
              />
            </div>

            <div>{item.name}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default LeftSidebarMenuItemsList
