'use client'

import { useEffect, useState } from 'react'

import mockNfts from '@/mock/server/marketplace/community-nfts.json'

import { NftCard } from './server-marketplace-nftcard'

export default function Trending() {
  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    const calculateItemsPerPage = () => {
      // Logic to calculate itemsPerPage based on screen width
      // Adjust based on your requirements
      const screenWidth = window.innerWidth
      const cardWidth = 250 // Specify the width of each card in pixels
      const calculatedItemsPerPage = Math.floor((screenWidth - 250) / cardWidth)
      setItemsPerPage(calculatedItemsPerPage > 0 ? calculatedItemsPerPage : 4)
    }

    calculateItemsPerPage()
    window.addEventListener('resize', calculateItemsPerPage)

    return () => {
      window.removeEventListener('resize', calculateItemsPerPage)
    }
  }, [])

  const paginatedCards = mockNfts.slice(0, itemsPerPage)

  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl">Trending</p>
        <a href="#" className="text-sm text-[#50FFFF]">
          See All
        </a>
      </div>
      <div className="mt-4 flex flex-row flex-wrap justify-between">
        {paginatedCards.map((item, index) => (
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
