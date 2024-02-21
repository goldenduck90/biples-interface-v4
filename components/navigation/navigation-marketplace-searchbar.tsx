'use client'

import { useState } from 'react'

export const MarketPlaceSearchBar = () => {
  const [value, setValue] = useState('')

  return (
    <div className="z-30 flex cursor-pointer items-center justify-center rounded-3xl bg-white/5 p-3 text-primary hover:opacity-80 ">
      <input
        className="relative w-full rounded-2xl  border bg-[#101010F7] p-3 pl-10 text-center"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!value && (
        <img
          src="/images/server/marketplace/search.svg"
          alt="Search"
          className="absolute mr-16 h-4 w-4"
        />
      )}
    </div>
  )
}
