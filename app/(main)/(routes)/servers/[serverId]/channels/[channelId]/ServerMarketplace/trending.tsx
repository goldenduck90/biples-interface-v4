import { marketCards2 } from './Cards'
import { MarketCard } from './market-card'

export default function Trending() {
  return (
    <div className="flex flex-col">
      <div className="m-[30px] flex justify-between">
        <p className="text-[25px]">Trending</p>
        <a href="#" className="text-center text-[13px] text-[#50FFFF]">
          See All
        </a>
      </div>
      <div className="flex flex-row flex-wrap justify-between gap-8">
        {marketCards2.map((item, index) => (
          <div key={index} className="w-[194px] rounded-[25px]">
            <MarketCard
              key={index}
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
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div className="h-0 w-[194px]" key={i} />
          ))}
      </div>
    </div>
  )
}
