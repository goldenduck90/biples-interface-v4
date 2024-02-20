'use client'

import properties from '@/mock/server/marketplace/detail-properties.json'

export default function Properties() {
  return (
    <div className="mt-4 flex w-1/2 flex-col gap-2">
      {properties.map((resource, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-2xl bg-[#101010F7] px-6 py-3"
        >
          <div className="flex flex-1 justify-start text-sm">
            {resource.section}
          </div>
          <div className="flex flex-1 justify-center text-sm">
            {resource.color}
          </div>
          <div className="flex flex-1 justify-end">
            <button className="h-[22px] w-[40px] rounded-2xl bg-[#1E395246] text-center text-sm text-[#50FFFF] hover:bg-[#50FFFF] hover:text-black">
              {resource.percent}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
