'use client'
import { useState } from 'react'

export const NavigationMarketPlaceSidebar = () => {
  const [value, setValue] = useState('')

  return (
    <div className="flex cursor-pointer items-center justify-center p-3 text-primary hover:opacity-80 ">
      <input
        className="relative w-[1000px] rounded-[15px]  border bg-[#101010F7] p-3 pl-10 text-center focus:border-sky-700 2xl:w-full"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!value && (
        <img
          src="/images/market/Vector.svg"
          alt="Search"
          className="absolute mr-[60px] h-4 w-4 cursor-pointer"
        />
      )}
    </div>
  )
}
