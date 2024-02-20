'use client'

export interface Offer {
  price: number
  from: string
  expires: string
  status: number
  floorDiff: string
}

interface Props {
  offers: Offer[]
}

export default function Offers({ offers }: Props) {
  return (
    <div className="mt-4 flex w-1/2 flex-col">
      <div className="flex items-center justify-between pl-6 text-xs text-[#6D6D6D]">
        <div className="flex w-2/12 justify-start">Price</div>
        <div className="flex w-4/12 justify-start">From</div>
        <div className="flex w-3/12 justify-start">Expires</div>
        <div className="flex w-3/12 justify-start">Floor difference</div>
      </div>
      <div>
        {offers.map((item, index) => (
          <OfferItem key={index} offer={item} />
        ))}
      </div>
    </div>
  )
}

function OfferItem({ offer }: { offer: Offer }) {
  return (
    <div className="my-3 flex items-center rounded-2xl bg-[#101010F7] py-3 pl-6">
      <div className="flex w-2/12 items-center gap-1">
        <img
          className="mb-1 h-[10px] w-[12px]"
          src="/images/server/marketplace/sol-blue.svg"
          alt="solana blue icon"
        />
        <p className="text-sm">{offer.price}</p>
      </div>
      <div className="flex w-4/12 items-center gap-1">
        <img
          className="h-4 w-4 rounded-xl"
          src="/images/server/marketplace/nft-detail-face-avatar.png"
          alt="Avatar"
        />
        <p className="text-sm">{offer.from}</p>
      </div>
      <div className="flex w-3/12 text-sm">{offer.expires}</div>
      {offer.status === 0 && (
        <div className="flex w-3/12">
          <div className="flex h-[20px] w-6/12 items-center justify-center rounded-3xl bg-white/5">
            <img
              className="h-3 w-[7px]"
              src="/images/server/marketplace/-.svg"
              alt="Avatar"
            />
          </div>
        </div>
      )}
      {offer.status === 1 && (
        <div className="flex w-3/12">
          <div className="flex h-[20px] w-6/12 items-center justify-center gap-1 rounded-3xl  bg-white/5">
            <img
              className="h-2 w-2"
              src="/images/market/Arrow-up.svg"
              alt="increase"
            />
            <p className="text-sm text-[#77FF8D]">{offer.floorDiff}</p>
          </div>
        </div>
      )}
      {offer.status === 2 && (
        <div className="flex w-3/12">
          <div className="flex h-[20px] w-6/12 items-center justify-center gap-1 rounded-3xl  bg-white/5">
            <img
              className="h-2 w-2"
              src="/images/market/Arrow-down.svg"
              alt="decrease"
            />
            <p className="text-sm text-[#FF5C5C]">{offer.floorDiff}</p>
          </div>
        </div>
      )}
    </div>
  )
}
