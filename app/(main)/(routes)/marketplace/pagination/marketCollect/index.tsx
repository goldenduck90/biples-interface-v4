import dataCollect1 from './dataCollect.json'
import dataCollect2 from './dataCollect2.json'
import MarketCollectName from './marketCollectName'
import MarketCollectPrice from './marketCollectPrice'
import MarketCollectVolume from './marketCollectVolum'
export default function MarketCollect() {
  return (
    <div className="z-30 mt-5 rounded-[25px] bg-zinc-900 sm:max-w-[95%] md:max-w-[95%] lg:flex lg:max-w-[98%] lg:flex-row lg:gap-4  xl:max-w-[98%]">
      <div className="pb-5  pt-10 md:w-full lg:w-1/2">
        <div>
          {dataCollect1.map((resource, index) => (
            <div
              key={index}
              className="mb-5 grid h-[36px] w-full grid-cols-9 items-center gap-3"
            >
              <div className="grid-start-1 col-span-1 grid w-1/5 px-9 font-sans text-[100%] font-thin text-white">
                {resource.id}
              </div>
              <MarketCollectName
                name={resource.name}
                image={resource.imageUrl}
              />
              <MarketCollectVolume volume={resource.volume} />
              <MarketCollectPrice price={resource.price} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 inline-block hidden w-0.5 self-stretch bg-cyan-950 opacity-100 dark:opacity-50 lg:block lg:h-[280px] lg:min-h-[4em]"></div>
      <div className="pt-10 md:w-full lg:w-1/2">
        <div>
          {dataCollect2.map((resource, index) => (
            <div
              key={index}
              className="mb-5 grid h-[36px] w-full grid-cols-9  items-center gap-3"
            >
              <div className="grid-start-1 col-span-1 grid w-1/5 px-9 font-sans text-[100%] font-thin text-white">
                {resource.id}
              </div>
              <MarketCollectName
                name={resource.name}
                image={resource.imageUrl}
              />
              <MarketCollectVolume volume={resource.volume} />
              <MarketCollectPrice price={resource.price} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
