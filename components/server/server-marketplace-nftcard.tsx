'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { useModal } from '@/hooks/use-modal-store'
import { cn } from '@/lib/utils'

interface NftCardProps {
  imageURL: string
  followers: string
  avatar: string
  userName: string
  nameFollow: string
  val: number
  state: number
}

export const NftCard = ({
  imageURL,
  followers,
  avatar,
  userName,
  nameFollow,
  val,
  state,
}: NftCardProps) => {
  const { onOpen } = useModal()
  const router = useRouter()
  const pathName = usePathname()
  const handleClick = (_e: any) => {
    console.log(router)
    router.push(`${pathName}/overview`)
  }

  const handleBuyCard = () => {
    onOpen('buyCard')
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={cn(
        'flex h-[316px] w-[216px] flex-col justify-between rounded-[30px] bg-white/5 p-2.5',
        state !== 1 && 'border border-[#53ACFF]',
      )}
    >
      {state === 1 && (
        <img
          src={imageURL}
          alt=""
          className="h-[196px] w-[196px] cursor-pointer rounded-[30px]"
          onClick={handleClick}
        />
      )}
      {state !== 1 && (
        <img
          src={imageURL}
          alt=""
          className="h-[150px] w-[196px] cursor-pointer rounded-[30px]"
          onClick={handleClick}
        />
      )}
      <div className="mx-1 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl">{userName}</p>
          <div className="rounded-full bg-[#10101041] px-2 pt-1 text-xs">
            {followers}
          </div>
        </div>
        <p className="text-xs text-[#6d6d6d]">{nameFollow}</p>
      </div>
      <div className="mx-1 flex gap-2">
        <Image src={avatar} alt="" width={16} height={16} />
        <p className="text-xl">{val}</p>
      </div>
      {state === 0 && (
        <div className="mb-1 flex items-center justify-between rounded-[10px] bg-white/5 pl-3">
          <Image
            src="/images/server/marketplace/sol-grey.svg"
            alt=""
            width={12}
            height={10}
          />
          <p className="text-xl">85</p>
          <p className="text-xs text-[#6d6d6d]">Floor-155 SOL</p>
          <div className="flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-[10px] bg-[#50FFFF] hover:animate-pulse">
            <Image
              alt="auction icon"
              src="/images/server/marketplace/auction-black.svg"
              width={18}
              height={15}
            />
          </div>
        </div>
      )}
      {state === 2 && (
        <div className="mb-1 flex items-center justify-between gap-2">
          <button
            className="w-full rounded-[10px] bg-[#50FFFF] py-1 text-xl text-black hover:animate-pulse"
            onClick={handleBuyCard}
          >
            Buy now
          </button>
          <div className="flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-[10px] bg-white/5">
            <Image
              alt="auction icon"
              src="/images/server/marketplace/auction-white.svg"
              width={18}
              height={15}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}
