import { NavigationSidebar } from '@/components/navigation/navigation-sidebar'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/top-header-wallet-icons'),
  { ssr: false },
)

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-30 mx-auto flex h-full w-full gap-5 bg-[#111214]">
      <section className="flex w-full flex-1 flex-col gap-5">
        <DynamicComponentWithNoSSR />

        <div className="z-30 flex h-fit w-full flex-col rounded-[25px] border bg-white/5 ">
          <NavigationSidebar />
        </div>

        <main className={`h-full`}>{children}</main>
      </section>
    </div>
  )
}

export default MainLayout
