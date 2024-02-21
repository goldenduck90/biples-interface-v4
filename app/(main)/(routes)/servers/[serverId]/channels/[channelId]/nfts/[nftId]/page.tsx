'use client'

import React from 'react'

import NftDetailSummary from '@/components/server/server-marketplace-detail-summary'
import Activity from '@/components/server/server-nft-activities'
import DetailTab from '@/components/server/server-nft-detail-tab'
import Offers from '@/components/server/server-nft-offers'
import Properties from '@/components/server/server-nft-properties'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import mockActivities from '@/mock/server/marketplace/detail-activities.json'
import mockOffers from '@/mock/server/marketplace/detail-offers.json'

const NftIdPage: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState('overview')

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white/5 px-4 py-2">
      <div className="flex max-h-[calc(100vh-18rem)] flex-col">
        <ScrollArea type="auto">
          <NftDetailSummary />
          <>
            <DetailTab currentTab={tabIndex} onChange={setTabIndex} />
            {/* footer_body */}
            {tabIndex === 'overview' && (
              <div className="mt-4 flex w-1/2 flex-col gap-2">
                <div className="w-full text-xl">Description</div>
                <div className="w-full text-xs">
                  <span>
                    Lorem lpsum is simply dummy text of printin and typesetting
                    industry. <b>Lorem</b> Ipsum has been the industry&apos;s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </span>
                </div>
              </div>
            )}
            {tabIndex === 'properties' && <Properties />}

            {tabIndex === 'offers' && <Offers offers={mockOffers} />}

            {tabIndex === 'activity' && (
              <Activity activities={mockActivities} />
            )}
          </>

          <ScrollBar orientation="vertical" className="rounded bg-white/10" />
        </ScrollArea>
      </div>
    </div>
  )
}

export default NftIdPage
