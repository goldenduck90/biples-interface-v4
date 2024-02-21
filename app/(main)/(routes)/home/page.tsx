'use client'
import Image from 'next/image'
import React from 'react'

import { CommunityCard } from '@/components/cards/community-card'

import { communityCards } from './home-communitycards'

const MyNFTsPage: React.FC = () => {
  return (
    <div className="z-30 flex h-[820px] w-full flex-col overflow-y-auto rounded-[25px] border bg-white/5 p-5">
      <div className="relative aspect-auto min-h-[234px] w-full">
        <Image
          src="/images/home/search-box-background.svg"
          alt=""
          fill
          objectFit="cover"
          className="absolute rounded-[25px] border"
        />
        <div className="absolute mt-12 flex w-full flex-col items-center justify-around gap-2 text-center text-[40px]">
          <p> Start your journey</p>
          <div className="flex cursor-pointer items-center p-3 text-primary hover:opacity-80 ">
            <input
              className="relative w-[430px] rounded-[10px] border  border-[0.75px] bg-zinc-950 bg-opacity-75 p-3 pl-10 text-[18px] text-[#6D6D6D] focus:border-sky-300 2xl:w-full"
              placeholder="Search community"
            />
            <img
              src="/images/server/marketplace/search.svg"
              alt="Search"
              className="absolute ml-[15px] h-5 w-5 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="my-4 text-2xl">Featured Communities</div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {communityCards.map((item, index) => (
          <CommunityCard
            key={index}
            imageURL={item.imageURL}
            followers={item.followers}
            avatar={item.avatar}
            userName={item.userName}
          />
        ))}
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div className="h-0 w-[220px]" key={i} />
          ))}
      </div>
    </div>
  )
}

export default MyNFTsPage
