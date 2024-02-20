'use client'

import { NftCard } from './server-marketplace-nftcard'

const cards = [
  {
    imageURL: '/images/server/marketplace/image (11).png',
    id: '2346',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 1,
  },
  {
    imageURL: '/images/server/marketplace/image (12).png',
    id: '2347',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 1,
  },
  {
    imageURL: '/images/server/marketplace/image (13).png',
    id: '2348',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 1,
  },
  {
    imageURL: '/images/server/marketplace/image (14).png',
    id: '2349',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 1,
  },
]

export default function Trending() {
  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl">Trending</p>
        <a href="#" className="text-sm text-[#50FFFF]">
          See All
        </a>
      </div>
      <div className="mt-4 flex flex-row flex-wrap justify-between">
        {cards.map((item, index) => (
          <NftCard
            key={index}
            imageURL={item.imageURL}
            id={item.id}
            avatar={item.avatar}
            userName={item.userName}
            nameFollow={item.nameFollow}
            val={item.val}
            state={item.state}
          />
        ))}
      </div>
    </div>
  )
}
