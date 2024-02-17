import LeftSidebarMenu from '@/components/left-sidebar-menu'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto flex h-full w-full gap-5 bg-[#111214] p-5">
        <LeftSidebarMenu />
        <section className="flex w-full flex-1 flex-col gap-5">
          <main className={`h-full`}>{children}</main>
        </section>
      </div>
    </>
  )
}

export default MainLayout
