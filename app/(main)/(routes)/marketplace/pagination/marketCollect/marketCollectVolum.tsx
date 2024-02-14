interface Props {
  volume: string
}

export default function MarketCollectVolume({ volume }: Props) {
  return (
    <div className="grid-start-6 col-span-2 grid w-full">
      <div className="flex h-5 w-full flex-row ">
        <div className="w-1/12 pt-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 7 6"
            fill="none"
          >
            <path
              d="M5.28918 1.2584H0L1.33813 0H6.62731L5.28918 1.2584ZM5.28918 5.17676H0L1.33813 3.91898H6.62731M1.33813 3.21758H6.62731L5.28918 1.95918H0"
              fill="#50FFFF"
            />
          </svg>
        </div>
        <div className="w-4/5">
          <div className="pl-1 font-sans text-[120%] font-thin text-white">
            {volume}
          </div>
        </div>
      </div>

      <div className="w-full font-sans text-[70%] font-thin text-gray-500">
        Total volume
      </div>
    </div>
  )
}
