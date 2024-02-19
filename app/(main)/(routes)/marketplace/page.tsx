'use client'
import React from 'react'

import { NavigationMarketPlaceSidebar } from '@/components/navigation/navigation-sidebar-maketplace'

import MarketCollect from './pagination/marketCollect'
import Trending from './pagination/marketTrending'
import SeeAll from './pagination/seeAll'
import TopCollect from './pagination/TopCollect'

const MyNFTsPage: React.FC = () => {
  return (
    <div>
      <div className="z-30 mb-5 flex h-fit flex-col rounded-[25px] border border-[#283643] bg-white/5 sm:w-[100%] md:w-[100%] xl:w-4/5 xl:w-[1050px] 2xl:w-[1600px]">
        <NavigationMarketPlaceSidebar />
      </div>
      <div className="z-30 h-fit flex-col rounded-[25px] border bg-white/5 sm:w-[100%] sm:pl-4 md:w-[100%] md:pl-8 lg:w-[100%] lg:pl-5 xl:w-[1050px] 2xl:w-[1600px]">
        <Trending />
        <TopCollect />
        <MarketCollect />
        <SeeAll />
      </div>
    </div>
  )
}

export default MyNFTsPage
