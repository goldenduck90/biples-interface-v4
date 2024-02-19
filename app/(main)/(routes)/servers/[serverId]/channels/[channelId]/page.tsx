import { ChannelType, MemberRole } from '@prisma/client'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { redirect } from 'next/navigation'

import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { MediaRoom } from '@/components/media-room'
import { NavigationSidebar } from '@/components/navigation/navigation-sidebar'
import { NavigationMarketSidebar } from '@/components/navigation/navigation-sidebar-market'
import { ServerHeader } from '@/components/server/server-header'
import { ServerRightRooms } from '@/components/server/servers-right-rooms'
import { currentProfile } from '@/lib/current-profile'
import prisma from '@/lib/prisma'

import LastSold from './ServerMarketplace/lastSold'
import Trending from './ServerMarketplace/trending'

interface ChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile()
  if (!profile) {
    return redirect('/sign-in')
  }

  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) {
    redirect('/')
  }

  const isAdmin = member.role === MemberRole.ADMIN
  const isModerator = member.role === MemberRole.MODERATOR
  const isOwner = member.id === member.id

  const handleNewMessage = (newMessage: any) => {
    console.log(newMessage)
  }

  return (
    <div className="flex h-full flex-col gap-5">
      {channel.type === ChannelType.TEXT && channel.name !== 'Marketplace' && (
        <>
          <div className="z-30 flex h-fit w-full flex-col rounded-[25px] border bg-white/5 ">
            <NavigationSidebar />
          </div>
          <div className="flex h-full flex-col rounded-[25px] bg-white/5">
            <ChatHeader
              name={channel.name}
              serverId={channel.serverId}
              type="channel"
            />
            <ChatMessages
              member={member}
              name={channel.name}
              chatId={channel.id}
              type="channel"
              apiUrl="/api/messages"
              socketUrl="/api/socket/messages"
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
              paramKey="channelId"
              paramValue={channel.id}
            />
            {channel.name === 'Announcements' && isAdmin && (
              <>
                <ChatInput
                  name={channel.name}
                  type="channel"
                  apiUrl="/api/socket/messages"
                  query={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                  }}
                />
              </>
            )}
            {channel.name !== 'Announcements' &&
              channel.name !== 'Marketplace' && (
                <ChatInput
                  name={channel.name}
                  type="channel"
                  apiUrl="/api/socket/messages"
                  query={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                  }}
                />
              )}
          </div>
        </>
      )}
      {channel.name === 'Marketplace' && (
        <div>
          <div className="z-30 mb-5 flex w-full flex-col rounded-[25px] border border-[#283643] bg-white/5">
            <NavigationMarketSidebar />
          </div>
          <div className="h-[790px] w-full flex-col overflow-y-auto rounded-[25px] border bg-white/5 p-5">
            <MarketSidebar serverId={channel.serverId} />
            {/*  */}
            <LastSold />
            {/* Trending */}
            <Trending />
          </div>
        </div>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  )
}

export default ChannelIdPage

interface ServerSidebarProps {
  serverId: string
}

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

const MarketSidebar = async ({ serverId }: ServerSidebarProps) => {
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
    <div className="left-0 right-0 z-20 flex h-[80px] w-full items-center rounded-t-2xl px-5  pt-2 text-primary">
      <div className="flex w-4/6  items-center gap-5">
        <div className="flex w-1/5">
          <ServerHeader server={server} role={role} />
        </div>
        <div className=" invisible w-full items-center justify-center rounded-[15px] border border-[#283643] p-2 lg:visible lg:flex lg:flex-row ">
          {properties.map((prop, index) => (
            <div key={index} className="flex w-1/5  gap-x-px">
              {prop.flag && (
                <img className="mt-0.5 h-4 w-4" src="/images/market/Mark.svg" />
              )}
              <span>
                <h5>{prop.val}</h5>
                <p className="text-[13px] text-stone-500">{prop.mval}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-2/6 flex-row-reverse">
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

const properties = [
  {
    flag: true,
    val: '200k',
    mval: 'Total volume',
  },
  {
    flag: true,
    val: '22.5k',
    mval: 'Best offer',
  },
  {
    flag: true,
    val: '334.1',
    mval: 'Floor price',
  },
  {
    flag: false,
    val: '2%',
    mval: 'Listed',
  },
  {
    flag: false,
    val: '4k',
    mval: 'Owners',
  },
]
