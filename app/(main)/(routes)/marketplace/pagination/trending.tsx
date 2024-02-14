import { useState, useRef, useEffect } from 'react'

// Data
import data from './data.json'

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
    <div className="carousel mx-auto my-12 sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1550px]">
      <div className="relative overflow-hidden">
        <div className="flex w-full flex-row">
          <div className="w-1/2 font-sans text-xl">Trending</div>

          <div className="flex w-1/2 flex-row-reverse">
            <div>
              <button
                type="button"
                className="inline-flex items-center px-2 py-1 text-center text-xs font-medium text-white "
                disabled={isDisabled('next')}
                onClick={moveNext}
              >
                <svg
                  className="h-6 w-8 text-white"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {' '}
                  <path stroke="none" d="M0 0h24v24H0z" />{' '}
                  <line x1="5" y1="12" x2="19" y2="12" />{' '}
                  <line x1="13" y1="18" x2="19" y2="12" />{' '}
                  <line x1="13" y1="6" x2="19" y2="12" />
                </svg>

                <span className="sr-only">Prev</span>
              </button>
            </div>

            <div>
              <button
                type="button"
                className="inline-flex items-center px-2 py-1 text-center text-xs font-medium text-white "
                disabled={isDisabled('prev')}
                onClick={movePrev}
              >
                <svg
                  className="h-6 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {' '}
                  <line x1="19" y1="12" x2="5" y2="12" />{' '}
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div
          ref={carousel}
          className="carousel relative z-0 flex w-full touch-pan-x snap-x snap-mandatory gap-10 overflow-hidden scroll-smooth"
        >
          {data.resources.map((resource, index) => {
            return (
              <div
                key={index}
                className="carousel-item relative h-32 w-32 snap-start rounded-[25px] bg-white/5 text-center md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-52 xl:w-52"
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
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Trending
