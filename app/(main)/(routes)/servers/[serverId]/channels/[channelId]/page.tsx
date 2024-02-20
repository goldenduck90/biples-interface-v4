import { ChannelType, MemberRole } from '@prisma/client'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { MediaRoom } from '@/components/media-room'
import { MarketplaceCharacteristicHeader } from '@/components/navigation/navigation-marketplace-characteristic'
import { NavigationSidebar } from '@/components/navigation/navigation-sidebar'
import { ServerMarketplaceHeader } from '@/components/server/server-marketplace-header'
import LastSold from '@/components/server/server-marketplace-lastsold'
import Trending from '@/components/server/server-marketplace-trending'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { currentProfile } from '@/lib/current-profile'
import prisma from '@/lib/prisma'

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

  const DynamicComponentWithNoSSR = dynamic(
    () => import('@/components/top-header-wallet-icons'),
    { ssr: false },
  )

  return (
    <div className="flex h-full flex-col gap-5">
      <DynamicComponentWithNoSSR />
      {channel.type === ChannelType.TEXT && channel.name !== 'Marketplace' && (
        <>
          <div className="z-30 flex h-fit w-full rounded-[25px] bg-white/5">
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
        <>
          <div className="z-30 flex h-fit w-full rounded-[25px] bg-white/5">
            <MarketplaceCharacteristicHeader />
          </div>
          <div className="flex h-full flex-col rounded-[25px] bg-white/5 px-3 py-2">
            <ServerMarketplaceHeader serverId={channel.serverId} />
            <div className="flex max-h-[calc(100vh-18rem)] flex-1 flex-col">
              <ScrollArea type="auto">
                {/*  */}
                <LastSold />
                {/* Trending */}
                <Trending />
                <ScrollBar
                  orientation="vertical"
                  className="rounded bg-white/10"
                />
              </ScrollArea>
            </div>
          </div>
        </>
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
