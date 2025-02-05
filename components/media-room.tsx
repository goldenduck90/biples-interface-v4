'use client'

import '@livekit/components-styles'

import { LiveKitRoom } from '@livekit/components-react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { CustomVideoConference } from './custom-videoconference'

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) {
    redirect('/sign-in')
  }

  //@ts-ignore
  const username = user.username

  const [token, setToken] = useState('')

  useEffect(() => {
    if (!username) return

    const name = `${username}`

    ;(async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [username, chatId])

  if (token === '') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <CustomVideoConference />
    </LiveKitRoom>
  )
}
