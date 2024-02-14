import { IoInformationCircleOutline } from 'react-icons/io5'
import { useState } from 'react'

export interface Activity {
  seller: string
  status: string
  buyer: string
  price: number
  order: number
  time: string
}

interface Props {
  activities: Activity[]
}

export default function Activities({ activities }: Props) {
  return (
    <div>
      <div className="m-2 flex w-full items-center justify-between  pl-12 pr-20 text-[15px]   text-[#6D6D6D] sm:invisible md:visible lg:w-1/2">
        <p className="w-4/9 mr-6">Seller</p>
        <p className="w-1/9">Status</p>
        <p className="w-2/9">Buyer</p>
        <p className="w-1/9">Price</p>
      </div>
      {activities.map((item, index) => (
        <ActivityItem key={index} activity={item} />
      ))}
    </div>
  )
}

function ActivityItem({ activity }: { activity: Activity }) {
  const [infoIndex, setInfoIndex] = useState()
  const handleClick = (e: any) => {
    console.log(e)
    infoIndex === e.order ? setInfoIndex(e) : setInfoIndex(e.order)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="my-3 flex w-full items-center justify-between rounded-[15px] border bg-[#101010F7] p-6   opacity-95 lg:w-1/2">
        <div className="w-4/9 flex items-center justify-center">
          <img
            className="mb-1 h-4 w-4 rounded-[10px] border"
            src="/images/market/Avatar.svg"
            alt="Avatar"
          />
          <div className="text-center text-[18px]">{activity.seller}</div>
        </div>
        {activity.status === 'Sale' && (
          <div className="w-1/9 block rounded-[30px] border bg-[#ffffff]  bg-opacity-5 px-5 py-0.5 text-[14px] text-[#4DE265]">
            {activity.status}
          </div>
        )}
        {activity.status === 'List' && (
          <div className="w-1/9 block rounded-[30px] border bg-[#ffffff]  bg-opacity-5 px-5 py-0.5 text-[14px] text-[#50FFFF]">
            {activity.status}
          </div>
        )}
        {activity.status !== 'Sale' && activity.status !== 'List' && (
          <div className="w-1/9 block rounded-[30px] border  bg-[#ffffff] bg-opacity-5 px-2 py-0.5 text-[14px]">
            {activity.status}
          </div>
        )}
        <div className="w-2/9 flex items-center justify-center">
          <img
            className="h-4 w-4 rounded-[10px] border"
            src="/images/market/Avatar.svg"
            alt="Avatar"
          />
          <div className="text-center text-[18px]">{activity.buyer}</div>
        </div>
        <div className="w-1/9 flex items-center justify-center">
          <img
            className="mb-1 h-4 w-4"
            src="/images/market/Mark.svg"
            alt="Mark"
          />
          <div className="text-center text-[18px]">{activity.price}</div>
        </div>
        <button
          className="w-1/9 flex items-center justify-center"
          onClick={() => handleClick(activity)}
        >
          <IoInformationCircleOutline />
        </button>
      </div>
      {infoIndex === activity.order && (
        <div className="relative flex w-1/6 items-center gap-6 rounded-[15px] border bg-[#101010F7] py-4 text-center text-[15px] opacity-95">
          <div className="m-0 h-8 w-1 bg-[#50FFFF] p-0" />
          {activity.time}
        </div>
      )}
    </div>
  )
}
