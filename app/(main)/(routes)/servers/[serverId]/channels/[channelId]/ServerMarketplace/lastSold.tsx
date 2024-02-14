'use client'
import NextButton from '@/app/(main)/(routes)/marketplace/pagination/marketTrending/nextButton'
import PrevButton from '@/app/(main)/(routes)/marketplace/pagination/marketTrending/prevButton'
import { useState, useRef, useEffect } from 'react'
import { marketCards } from './Cards'
import { MarketCard } from './market-card'

// Data

const LastSold = () => {
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carousel = useRef<any>(null)

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 0.3)
    }
  }

  const moveNext = () => {
    if (carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex((prevState) => prevState + 0.3)
    }
  }

  const isDisabled = (direction: any) => {
    if (direction === 'prev') {
      return currentIndex <= 0
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      )
    }

    return false
  }

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0
  }, [])

  return (
    <div className="carousel my-[30px] overflow-hidden">
      <div className="flex w-full flex-row justify-between">
        <div className="pl-[30px] font-sans text-[25px]">LastSold</div>

        <div className="flex flex-row-reverse">
          <NextButton moveNext={moveNext} isDisabled={isDisabled} />
          <PrevButton movePrev={movePrev} isDisabled={isDisabled} />
        </div>
      </div>
      <div
        ref={carousel}
        className="carousel relative z-0 ml-1 mt-8 flex w-full touch-pan-x snap-x snap-mandatory gap-16 overflow-hidden scroll-smooth"
      >
        {marketCards.map((item, index) => (
          <div
            key={index}
            className="carousel-item relative h-[328px] w-32 snap-start rounded-[25px] text-center md:w-40  lg:w-56  xl:w-56"
          >
            <MarketCard
              imageURL={item.imageURL}
              followers={item.followers}
              avatar={item.avatar}
              userName={item.userName}
              nameFollow={item.nameFollow}
              val={item.val}
              state={item.state}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LastSold
