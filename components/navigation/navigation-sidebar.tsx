import { redirect } from 'next/navigation'

import { ModeToggle } from '@/components/mode-toggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { currentProfile } from '@/lib/current-profile'
import prisma from '@/lib/prisma'
import { IoSearch } from 'react-icons/io5'
import { NavigationAction } from './navigation-action'
import { NavigationItem } from './navigation-item'
import { useWallet } from '@solana/wallet-adapter-react'
import { MdArrowForward } from 'react-icons/md'

export const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className="flex h-full w-full items-center p-3 text-primary">
      <NavigationAction />
      <ScrollArea className="flex w-full flex-1">
        <div className="flex items-center gap-2.5">
          {servers.map((server) => (
            <div key={server.id}>
              <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-[#4effff72] transition-all delay-100 hover:border-cyan-700 hover:opacity-80">
        <MdArrowForward color="#4effff72" />
      </div>
    </div>
  )
}
