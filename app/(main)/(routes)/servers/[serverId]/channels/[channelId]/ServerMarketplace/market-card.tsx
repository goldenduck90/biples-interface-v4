'use client'
import Image from 'next/image'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
interface MarketCardProps {
  imageURL: string
  followers: string
  avatar: string
  userName: string
  nameFollow: string
  val: number
  state: number
}

export const MarketCard = ({
  imageURL,
  followers,
  avatar,
  userName,
  nameFollow,
  val,
  state,
}: MarketCardProps) => {
  const { onOpen } = useModal()
  const router = useRouter()
  const pathName = usePathname()
  const handleClick = (e: any) => {
    console.log(router)
    router.push(`${pathName}/overview`)
  }

  const handleBuyCard = (e: any) => {
    onOpen('buyCard')
  }

  return (
    <div className="h-[328px] w-full rounded-[30px] border bg-[#ffffff] bg-opacity-5 p-2 hover:w-[120%] hover:bg-opacity-0 hover:p-0">
      {state === 1 && (
        <img
          src={imageURL}
          alt=""
          className="h-[205px] w-full cursor-pointer rounded-[30px] border"
          onClick={handleClick}
        />
      )}
      {state !== 1 && (
        <img
          src={imageURL}
          alt=""
          className="h-[160px] w-full cursor-pointer rounded-[30px] border"
          onClick={handleClick}
        />
      )}
      <div className="mx-1 flex flex-col">
        <div className="my-1 flex items-center justify-between gap-2 sm:text-[40%] ">
          <p className="text-[20px]">{userName}</p>
          <div className="w-fit rounded-full bg-[#ffffff] bg-gray-950 px-2 text-center text-[13px] sm:invisible md:invisible xl:visible">
            {followers}
          </div>
        </div>
        <p className="text-[16px] text-stone-500">{nameFollow}</p>
      </div>
      <div className="ml-4 flex flex-row gap-2">
        <Image src={avatar} alt="" width={16} height={16} />
        <p className="text-[20px]">{val}</p>
      </div>
      {state === 0 && (
        <div className="m-2 flex w-auto items-center justify-between rounded-[10px] border bg-zinc-700">
          <Image
            src="/images/market/Mark-gr.svg"
            alt=""
            width={16}
            height={16}
            className="relative ml-2"
          />
          <p className="text-[20px]">85</p>
          <p className="text-[12px] text-stone-500">Floor-155 SOL</p>
          <div className="flex items-center justify-center">
            <Image
              src="/images/market/Rectangle .svg"
              alt=""
              width={40}
              height={40}
              className="relative"
            />
            <Image
              src="/images/market/hammer.svg"
              alt=""
              width={20}
              height={20}
              className="absolute"
            />
          </div>
        </div>
      )}
      {state === 2 && (
        <div className="my-2 flex items-center justify-between">
          <button
            className="sm:text[8px] animate-bounce rounded-[10px] border bg-cyan-400 py-1 text-[20px] text-zinc-950 hover:border-none hover:bg-green-600 hover:text-white sm:px-0 md:px-[10px] lg:px-[20px]"
            onClick={handleBuyCard}
          >
            Buy now
          </button>
          <div className="flex items-center justify-center">
            <Image
              src="/images/market/Rectangle-wh.svg"
              alt=""
              width={40}
              height={40}
              className="relative"
            />
            <Image
              src="/images/market/hammer-wh.svg"
              alt=""
              width={20}
              height={20}
              className="absolute"
            />
          </div>
        </div>
      )}
    </div>
  )
}
