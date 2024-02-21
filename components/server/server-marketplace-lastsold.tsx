'use client'

import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { cn } from '@/lib/utils'
import mockNfts from '@/mock/server/marketplace/community-nfts.json'

import { NftCard } from './server-marketplace-nftcard'
// Data

const LastSold = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalCards = mockNfts.length
  const totalPages = Math.ceil(totalCards / itemsPerPage)

  const paginatedCards = mockNfts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const next = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const prev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl">Last Sold</div>
        <div className="flex flex-row gap-4">
          <button
            disabled={currentPage === 1}
            className={cn(
              'cursor-pointer text-white transition-all delay-100 hover:opacity-80',
              currentPage !== 1 && 'text-[#50FFFF]',
            )}
            onClick={prev}
          >
            <FaArrowLeft />
          </button>
          <button
            disabled={currentPage === totalPages}
            className={cn(
              'cursor-pointer text-white transition-all delay-100 hover:opacity-80',
              currentPage !== totalPages && 'text-[#50FFFF]',
            )}
            onClick={next}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
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

export default LastSold
