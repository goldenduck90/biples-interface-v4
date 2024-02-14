import LeftSidebarMenu from '@/components/left-sidebar-menu'
import { NavigationSidebar } from '@/components/navigation/navigation-sidebar'
import { useWallet } from '@solana/wallet-adapter-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import { redirect } from 'next/navigation'

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/top-header-wallet-icons'),
  { ssr: false },
)

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto flex h-full w-full gap-5 bg-[#111214] p-5">
        <LeftSidebarMenu />
        <section className="flex w-full flex-1 flex-col gap-5">
          {/* <DynamicComponentWithNoSSR /> */}

          {/* <div className="bg-white/5 border rounded-[25px] flex h-fit w-full z-30 flex-col ">
            <NavigationSidebar />
          </div> */}

          <main className={`h-full`}>{children}</main>
        </section>
      </div>
    </>
  )
}

export default MainLayout
