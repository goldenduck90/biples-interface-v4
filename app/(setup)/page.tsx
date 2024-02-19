import { redirect } from 'next/navigation'

import { InitialModal } from '@/components/modals/initial-modal'
import { initialProfile } from '@/lib/initial-profile'
import prisma from '@/lib/prisma'

const SetupPage = async () => {
  const profile = await initialProfile()

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}

export default SetupPage
