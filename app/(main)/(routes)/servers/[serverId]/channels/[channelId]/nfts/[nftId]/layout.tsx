import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import { MarketplaceCharacteristicHeader } from '@/components/navigation/navigation-marketplace-characteristic'
import { BackBtn } from '@/components/server/server-marketplace-back'
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

  const DynamicComponentWithNoSSR = dynamic(
    () => import('@/components/top-header-wallet-icons'),
    { ssr: false },
  )

  return (
    <div className="mx-auto flex h-full w-full flex-col gap-5 rounded-3xl bg-[#111214]">
      <div className="flex items-center justify-between gap-3">
        <BackBtn />
        <div className="w-full">
          <DynamicComponentWithNoSSR />
        </div>
      </div>
      <div className="z-30 mb-5 flex h-fit w-full flex-col rounded-3xl bg-white/5">
        <MarketplaceCharacteristicHeader />
      </div>
      <main className="h-full rounded-3xl">{children}</main>
    </div>
  )
}

export default ServerIdLayout
