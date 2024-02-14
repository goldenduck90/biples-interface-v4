import { useState, useRef, useEffect } from 'react'

// Data
import data from './data.json'
import NextButton from './nextButton'
import PrevButton from './prevButton'

const Trending = () => {
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
    <div className="carousel my-12  sm:max-w-[95%] md:max-w-[95%] lg:max-w-[98%]  xl:max-w-[98%]">
      <div className="relative overflow-hidden">
        <div className="flex w-full flex-row">
          <div className="w-1/2 font-sans text-xl">Trending</div>

          <div className="flex w-1/2 flex-row-reverse">
            <NextButton moveNext={moveNext} isDisabled={isDisabled} />
            <PrevButton movePrev={movePrev} isDisabled={isDisabled} />
          </div>
        </div>
        <div
          ref={carousel}
          className="carousel relative z-0 mt-8 flex w-full touch-pan-x snap-x snap-mandatory gap-5 overflow-hidden scroll-smooth"
        >
          {data.map((resource, index) => (
            <div
              key={index}
              className="carousel-item relative h-32 w-32 snap-start rounded-[25px] bg-white/5 text-center md:h-40 md:w-40 lg:h-56 lg:w-56 xl:h-56 xl:w-56"
            >
              <div className="z-0 block aspect-square h-full w-full bg-cover bg-left-top bg-no-repeat bg-origin-padding">
                <img
                  src={resource.imageUrl || ''}
                  alt=" "
                  className="aspect-square w-full"
                />
                <div className="absolute bottom-2 ml-5 flex w-full flex-row items-center">
                  <img
                    src={resource.imageL}
                    className="hidden w-6 lg:block"
                  ></img>
                  <div className="md: ml-5 hidden  w-1/2  font-sans  font-thin  text-white md:block md:text-[50%] lg:text-[80%]  xl:text-[100%]">
                    Claynosaurz
                  </div>
                  <div className="hidden xl:block  xl:w-1/2">
                    <img src={resource.imageR} className="ml-1 w-1/4 "></img>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trending
