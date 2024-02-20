'use client'

import Image from 'next/image'

export default function NftDetailSummary() {
  return (
    <div className="flex w-full gap-8 pr-4 pt-8">
      <img
        src="/images/server/marketplace/nft-detail.png"
        className="h-[450px] w-[450px]"
      />
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center gap-1">
          <img
            src="/images/server/marketplace/nft-detail-avatar.png"
            className="w-[36px]"
          />

          <div className="flex flex-col">
            <div className="text-sm">Claynopsaurz</div>
            <div className="text-xs text-[#6D6D6D] ">@Claynopsaurz</div>
          </div>
        </div>

        <div className="flex flex-row items-center pt-8">
          <div className="text-3xl font-semibold">Claynopsaurz</div>
          <div className="ml-8 items-center rounded-3xl bg-[#10101041] px-2 py-1">
            <div className="text-center text-sm">#2341</div>
          </div>
        </div>
        <hr className="mt-2 w-full border border-[#53ACFF]" />

        {/* owner */}
        <div className="mt-4 flex w-full flex-row items-center">
          <div className="flex w-full flex-row items-center gap-1">
            <img
              src="/images/server/marketplace/nft-detail-avatar.png"
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <p className="text-xs text-[#6D6D6D] ">Owner</p>
              <p className="text-sm">Claynopsaurz</p>
            </div>
          </div>

          <div className="flex w-full flex-row items-center gap-1">
            <img
              src="/images/server/marketplace/nft-detail-face-avatar.png"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-xs text-[#6D6D6D] ">Owner</p>
              <p className="text-sm">Andrew Jackson</p>
            </div>
          </div>
        </div>
        {/* price */}
        <div className="mt-8 w-full rounded-3xl bg-[#10101061] px-10 py-8">
          <div className="text-sm text-[#6D6D6D] ">Price</div>

          <div className="my-2 flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <img
                className="mb-1 h-[25px] w-[30px]"
                src="/images/server/marketplace/sol-blue.svg"
                alt="sol icon"
              />
              <div className="text-3xl">225.31</div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="text-sm text-[#6D6D6D] ">Floor price</div>
              <img
                className="mb-1 h-4 w-4 rounded-[10px] border"
                src="/images/server/marketplace/sol-grey.svg"
                alt="sol icon"
              />
              <div className="text-xs text-[#6D6D6D] ">155</div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="mt-8 flex w-full flex-row items-center justify-between gap-2">
          <button className="h-[55px] w-full rounded-2xl bg-[#50FFFF] text-center text-2xl font-medium text-black hover:animate-pulse">
            Buy now
          </button>
          <div className="flex min-h-[55px] min-w-[55px] cursor-pointer items-center justify-center rounded-[10px] bg-white/5 hover:animate-bounce">
            <Image
              alt="auction icon"
              src="/images/server/marketplace/auction-white.svg"
              width={30}
              height={25}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
