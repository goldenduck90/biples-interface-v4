import dynamic from 'next/dynamic'

import { MarketPlaceSearchBar } from '@/components/navigation/navigation-marketplace-searchbar'

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/top-header-wallet-icons'),
  { ssr: false },
)

const MarketplaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-30 mx-auto flex h-full w-full flex-col gap-5 bg-[#111214]">
      <section className="w-full">
        <DynamicComponentWithNoSSR />
      </section>
      <MarketPlaceSearchBar />

      <main className="h-full">{children}</main>
    </div>
  )
}

export default MarketplaceLayout
