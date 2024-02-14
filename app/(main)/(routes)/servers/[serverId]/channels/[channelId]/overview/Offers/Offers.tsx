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
    <div>
      <div className="m-2 flex items-center justify-between px-5 text-[15px] text-[#6D6D6D]">
        <p className="w-1/7">Price</p>
        <p className="w-2/7">From</p>
        <p className="w-2/7">Expires</p>
        <p className="w-1/7">Floor</p>
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
    <div className="my-3 flex items-center justify-between rounded-[15px] border bg-[#101010F7] p-5 opacity-95">
      <div className="w-1/7 flex items-center justify-center">
        <img
          className="mb-1 h-4 w-4"
          src="/images/market/Mark.svg"
          alt="Mark"
        />
        <p className="text-center text-[18px]">{offer.price}</p>
      </div>
      <div className="justify-left w-2/7 flex items-center">
        <img
          className="mb-1 h-4 w-4 rounded-[10px] border"
          src="/images/market/Avatar.svg"
          alt="Avatar"
        />
        <p className="text-center text-[18px]">{offer.from}</p>
      </div>
      <p className="w-2/7 text-center text-[18px]">{offer.expires}</p>
      {offer.status === 0 && (
        <div className="w-1/7 flex items-center justify-center gap-1 rounded-[30px]  border bg-[#ffffff] bg-opacity-5 px-2 py-0.5">
          <img
            className="mb-1 h-3 w-3"
            src="/images/market/-.svg"
            alt="Avatar"
          />
          <p className="text-center text-[18px]">{offer.floorDiff}</p>
        </div>
      )}
      {offer.status === 1 && (
        <div className="w-1/7 flex items-center justify-center gap-1 rounded-[30px]  border bg-[#ffffff] bg-opacity-5 px-2 py-0.5">
          <img
            className="mb-1 h-3 w-3"
            src="/images/market/Arrow-up.svg"
            alt="increase"
          />
          <p className="text-center text-[18px] text-[#77FF8D]">
            {offer.floorDiff}
          </p>
        </div>
      )}
      {offer.status === 2 && (
        <div className="w-1/7 flex items-center justify-center gap-1 rounded-[30px]  border bg-[#ffffff] bg-opacity-5 px-2 py-0.5">
          <img
            className="mb-1 h-3 w-3"
            src="/images/market/Arrow-down.svg"
            alt="decrease"
          />
          <p className="text-center text-[18px] text-[#FF5C5C]">
            {offer.floorDiff}
          </p>
        </div>
      )}
    </div>
  )
}
