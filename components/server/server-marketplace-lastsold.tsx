'use client'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { NftCard } from './server-marketplace-nftcard'

// Data
const cards = [
  {
    imageURL: '/images/server/marketplace/image (7).png',
    id: '2341',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 1,
  },
  {
    imageURL: '/images/server/marketplace/image (8).png',
    id: '2342',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 2,
  },
  {
    imageURL: '/images/server/marketplace/image (9).png',
    id: '2343',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 0,
  },
  {
    imageURL: '/images/server/marketplace/image (10).png',
    id: '2344',
    avatar: '/images/market/Mark.svg',
    userName: 'Claynosaurz',
    nameFollow: '@claynosaurz',
    val: 225.31,
    state: 1,
  },
]

const LastSold = () => {
  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl">Last Sold</div>
        <div className="flex flex-row gap-4">
          <div className="cursor-pointer text-white transition-all delay-100 hover:opacity-80">
            <FaArrowLeft />
          </div>
          <div className="cursor-pointer text-[#50FFFF] transition-all delay-100 hover:opacity-80">
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
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

export default LastSold
