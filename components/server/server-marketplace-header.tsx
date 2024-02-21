import { ChannelType, MemberRole } from '@prisma/client'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { redirect } from 'next/navigation'

import { currentProfile } from '@/lib/current-profile'
import prisma from '@/lib/prisma'

import { ServerHeader } from './server-header'
import { ServerRightRooms } from './servers-right-rooms'

interface ServerMarketplaceHeaderProps {
  serverId: string
}

const properties = [
  {
    flag: true,
    value: '200k',
    description: 'Total volume',
  },
  {
    flag: true,
    value: '22.5k',
    description: 'Best offer',
  },
  {
    flag: true,
    value: '334.1',
    description: 'Floor price',
  },
  {
    flag: false,
    value: '2%',
    description: 'Listed',
  },
  {
    flag: false,
    value: '4k',
    description: 'Owners',
  },
]

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
}

export const ServerMarketplaceHeader = async ({
  serverId,
}: ServerMarketplaceHeaderProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  )
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  )
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  )
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  )

  if (!server) {
    return redirect('/')
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role

  return (
    <div className="flex flex-row items-center justify-between rounded-t-2xl py-2 text-primary">
      <div className="flex flex-1 items-center gap-2">
        <ServerHeader server={server} role={role} />
        <div className="flex items-center gap-8 rounded-[15px] border border-[#283643] px-8 py-1">
          {properties.map((prop, index) => (
            <div key={index} className="flex flex-row gap-1">
              {prop.flag && (
                <img
                  className="mt-0.5 h-4 w-4"
                  src="/images/server/marketplace/sol-blue.svg"
                />
              )}
              <span>
                <h5>{prop.value}</h5>
                <p className="text-[12px] text-stone-500">{prop.description}</p>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <ServerRightRooms
          server={server}
          role={role}
          members={members}
          videoChannels={videoChannels}
          textChannels={textChannels}
          audioChannels={audioChannels}
        />
      </div>
    </div>
  )
}
