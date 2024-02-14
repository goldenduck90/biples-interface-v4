import { redirect } from 'next/navigation'

import { ServerSidebar } from '@/components/server/server-sidebar'
import { currentProfile } from '@/lib/current-profile'
import prisma from '@/lib/prisma'

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  return (
    <div className="h-full">
      <div className="z-20 hidden h-full w-60 flex-col">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full rounded-[25px]">{children}</main>
    </div>
  )
}

export default ServerIdLayout
