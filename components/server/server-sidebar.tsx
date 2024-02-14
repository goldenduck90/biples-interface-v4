import { ChannelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { currentProfile } from '@/lib/current-profile'
import prisma from '@/lib/prisma'

import { ServerHeader } from './server-header'
import { ServerSearch } from './server-search'
import { ServerSection } from './server-section'
import { ServerChannel } from './server-channel'
import { ServerMember } from './server-member'
import { ServerRightRooms } from './servers-right-rooms'

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

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
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
    <div className="absolute left-0 right-0 top-0 z-20 flex h-[80px] w-full flex-row items-center justify-between rounded-t-2xl px-5 pt-2 text-primary">
      <div className="w-full flex-1">
        <ServerHeader server={server} role={role} />
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

/*

       <ScrollArea className="flex-1 px-3">

          {!!textChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.TEXT}
                role={role}
                label="Text Channels"
              />
              <div className="space-y-[2px]">
                {textChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
          {!!audioChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.AUDIO}
                role={role}
                label="Voice Channels"
              />
              <div className="space-y-[2px]">
                {audioChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
          {!!videoChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.VIDEO}
                role={role}
                label="Video Channels"
              />
              <div className="space-y-[2px]">
                {videoChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
          {!!members?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="members"
                role={role}
                label="Members"
                server={server}
              />
              <div className="space-y-[2px]">
                {members.map((member) => (
                  <ServerMember
                    key={member.id}
                    member={member}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
        </ScrollArea>

      */
