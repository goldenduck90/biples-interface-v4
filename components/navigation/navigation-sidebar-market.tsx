import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const NavigationMarketSidebar = async () => {
  return (
    <div className="flex h-full w-full items-center justify-between p-3 text-primary">
      <div className="flex gap-2">
        {characteristics.map((characteristic, index) => (
          <Select key={index}>
            <div className="relative flex items-center">
              <SelectTrigger className="relative rounded-[15px] border border-[#53acff28] bg-white/5 pl-4 capitalize text-white outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder={characteristic.title} />
              </SelectTrigger>
            </div>
            <SelectContent>
              {characteristic.items.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="capitalize text-white"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
      <div className="flex w-[275px] cursor-pointer items-center hover:opacity-80">
        <input
          className="relative h-[46px] w-full rounded-[15px] border bg-[#101010F7] p-3 pl-10"
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

const characteristics = [
  { title: 'Background', items: ['Background', 'Black', 'White', 'Pink'] },
  { title: 'Body', items: ['Body', 'Big', 'Medium', 'Small'] },
  { title: 'Face', items: ['Face', 'Ugly', 'Handsome'] },
  { title: 'Hair', items: ['Hair', 'Straight', 'Curl'] },
  { title: 'Piercing', items: ['Piercing', 'Ring', 'Diamond'] },
]
