import Values from './Offers.json'

export default function Offers() {
  return (
    <div>
      <div className="m-2 flex items-center justify-between px-5">
        <p className="w-1/7">Price</p>
        <p className="w-2/7">From</p>
        <p className="w-2/7">Expires</p>
        <p className="w-1/7">Floor</p>
      </div>
      <div>
        {Values.Offers.map((item, index) => {
          return (
            <div
              key={index}
              className="my-2 flex items-center justify-between rounded-[15px] border bg-[#101010F7] p-5 opacity-95"
            >
              <div className="w-1/7 flex items-center justify-center">
                <img
                  className="h-5 w-5"
                  src="/images/market/Mark.svg"
                  alt="Mark"
                />
                <p className="text-center text-[18px]">{item.Price}</p>
              </div>
              <div className="justify-left w-2/7 flex items-center">
                <img
                  className="h-5 w-5 rounded-[10px] border"
                  src="/images/market/Avatar.svg"
                  alt="Avatar"
                />
                <p className="text-center text-[18px]">{item.From}</p>
              </div>
              <p className="w-2/7 text-center text-[18px]">{item.Expires}</p>
              {item.State === 0 && (
                <div className="w-1/7 flex items-center justify-center gap-1 rounded-[30px]  border bg-[#ffffff] bg-opacity-5 px-2 py-0.5">
                  <img
                    className="h-3 w-3"
                    src="/images/market/-.svg"
                    alt="Avatar"
                  />
                  <p className="text-center text-[18px]">
                    {item['Floor difference']}
                  </p>
                </div>
              )}
              {item.State === 1 && (
                <div className="w-1/7 flex items-center justify-center gap-1 rounded-[30px]  border bg-[#ffffff] bg-opacity-5 px-2 py-0.5">
                  <img
                    className="h-3 w-3"
                    src="/images/market/Arrow-up.svg"
                    alt="increase"
                  />
                  <p className="text-center text-[18px] text-[#77FF8D]">
                    {item['Floor difference']}
                  </p>
                </div>
              )}
              {item.State === 2 && (
                <div className="w-1/7 flex items-center justify-center gap-1 rounded-[30px]  border bg-[#ffffff] bg-opacity-5 px-2 py-0.5">
                  <img
                    className="h-3 w-3"
                    src="/images/market/Arrow-down.svg"
                    alt="decrease"
                  />
                  <p className="text-center text-[18px] text-[#FF5C5C]">
                    {item['Floor difference']}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
