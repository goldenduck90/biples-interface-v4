'use client'

import { useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

import { cn } from '@/lib/utils'

export interface Activity {
  seller: string
  status: string
  buyer: string
  price: number
  order: number
  time: string
}

interface Props {
  activities: Activity[]
}

export default function Activities({ activities }: Props) {
  return (
    <div className="mt-4 flex flex-col">
      <div className="mb-1.5 flex w-1/2 items-center justify-between pl-6 text-xs text-[#6D6D6D]">
        <p className="flex w-3/12 justify-start">Seller</p>
        <p className="flex w-2/12 justify-start">Status</p>
        <p className="flex w-3/12 justify-start">Buyer</p>
        <p className="flex w-2/12 justify-start">Price</p>
        <p className="flex w-2/12 justify-start"></p>
      </div>
      {activities.map((item, index) => (
        <ActivityItem key={index} activity={item} />
      ))}
    </div>
  )
}

function ActivityItem({ activity }: { activity: Activity }) {
  const [infoIndex, setInfoIndex] = useState()
  const handleClick = (e: any) => {
    console.log(e)
    infoIndex === e.order ? setInfoIndex(e) : setInfoIndex(e.order)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="my-1.5 flex w-1/2 items-center rounded-2xl bg-[#101010F7] py-3 pl-6">
        <div className="flex w-3/12 items-center gap-1">
          <img
            className="h-4 w-4 rounded-xl"
            src="/images/server/marketplace/nft-detail-face-avatar.png"
            alt="Avatar"
          />
          <div className="text-sm">{activity.seller}</div>
        </div>
        <div className="flex w-2/12">
          <div className="flex h-[20px] w-9/12 items-center justify-center gap-1 rounded-3xl bg-white/5">
            <p
              className={cn(
                'text-xs ',
                activity.status === 'Sale'
                  ? 'text-[#4DE265]'
                  : activity.status === 'List'
                    ? 'text-[#50FFFF]'
                    : 'text-white',
              )}
            >
              {activity.status}
            </p>
          </div>
        </div>
        <div className="flex w-3/12 items-center gap-1">
          <img
            className="h-4 w-4 rounded-xl"
            src="/images/server/marketplace/nft-detail-face-avatar.png"
            alt="Avatar"
          />
          <div className="text-sm">{activity.buyer}</div>
        </div>
        <div className="flex w-2/12 items-center gap-1">
          <img
            className="mb-1 h-[10px] w-[12px]"
            src="/images/server/marketplace/sol-blue.svg"
            alt="solana blue icon"
          />
          <div className="text-sm">{activity.price}</div>
        </div>
        <button
          className="flex w-2/12 items-center"
          onClick={() => handleClick(activity)}
        >
          <IoInformationCircleOutline />
        </button>
      </div>
      {infoIndex === activity.order && (
        <div className="flex items-center gap-3 rounded-lg bg-[#101010F7] py-2 pr-3 text-xs">
          <div className="h-3 w-0.5 bg-[#50FFFF]" />
          {activity.time}
        </div>
      )}
    </div>
  )
}
