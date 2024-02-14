export const NavigationMarketSidebar = async () => {
  return (
    <div className="flex h-full w-full items-center justify-between p-3 text-primary">
      <div className="invisible justify-start lg:visible lg:ml-4 lg:flex lg:gap-4">
        {dropDown.map((item, index) => (
          <select
            key={index}
            data-te-select-init
            className="flex cursor-pointer items-center justify-center gap-3 rounded-[15px] border bg-white/5 p-2 dark:border-cyan-950"
          >
            <option value="1">{item.title}</option>
          </select>
        ))}
      </div>
      <div className="flex w-full cursor-pointer items-center hover:opacity-80 lg:hidden xl:flex xl:w-[20%] xl:items-center">
        <input
          className="relative h-[46px] w-full rounded-[15px] border bg-[#101010F7] p-3 pl-10 focus:border-sky-700"
          placeholder="Search"
        />
        <img
          src="/images/market/Vector.svg"
          alt="Search"
          className="absolute ml-5 h-4 w-4"
        />
      </div>
    </div>
  )
}

const dropDown = [
  { title: 'Background' },
  { title: 'Body' },
  { title: 'Face' },
  { title: 'Hair' },
  { title: 'Piercing' },
]
