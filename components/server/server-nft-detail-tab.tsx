'use client'

import { cn } from '@/lib/utils'

interface Props {
  currentTab: string
  onChange: (value: string) => void
}

export default function DetailTab({ currentTab, onChange }: Props) {
  return (
    <>
      <div className="mt-8 flex w-1/2 flex-row justify-between border-b border-b-[#53ACFF]">
        <div
          onClick={() => onChange('overview')}
          className="flex flex-1 cursor-pointer flex-col"
        >
          <div
            className={cn(
              'pb-2 text-center text-white',
              currentTab === 'overview' && 'text-[#50FFFF]',
            )}
          >
            Overview
          </div>
          {currentTab === 'overview' && (
            <div className="rounded-t-lg border-2 border-[#50FFFF]"></div>
          )}
        </div>
        <div
          onClick={() => onChange('properties')}
          className="flex flex-1 cursor-pointer flex-col"
        >
          <div
            className={cn(
              'pb-2 text-center text-white',
              currentTab === 'properties' && 'text-[#50FFFF]',
            )}
          >
            Properties
          </div>
          {currentTab === 'properties' && (
            <div className="rounded-t-lg border-2 border-[#50FFFF]"></div>
          )}
        </div>
        <div
          onClick={() => onChange('offers')}
          className="flex flex-1 cursor-pointer flex-col"
        >
          <div
            className={cn(
              'pb-2 text-center text-white',
              currentTab === 'offers' && 'text-[#50FFFF]',
            )}
          >
            Offers
          </div>
          {currentTab === 'offers' && (
            <div className="rounded-t-lg border-2 border-[#50FFFF]"></div>
          )}
        </div>
        <div
          onClick={() => onChange('activity')}
          className="flex flex-1 cursor-pointer flex-col"
        >
          <div
            className={cn(
              'pb-2 text-center text-white',
              currentTab === 'activity' && 'text-[#50FFFF]',
            )}
          >
            Activity
          </div>
          {currentTab === 'activity' && (
            <div className="rounded-t-lg border-2 border-[#50FFFF]"></div>
          )}
        </div>
      </div>
    </>
  )
}
