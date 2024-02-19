'use client'

import { Icon } from '@iconify/react'
import { Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/use-modal-store'
export const NavigationAction = () => {
  const { onOpen } = useModal()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="bg-trasparent group mr-3 flex h-[48px] w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[16px] border border-[#50FFFF]/40 text-[#50FFFF]/40 transition-all hover:border-[#50FFFF]/80  hover:text-[#50FFFF] "
        >
          <Plus className=" p-2.5  transition-all" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 rounded-[14px] border-0 bg-black/60 backdrop-blur-md">
          <DropdownMenuItem
            onClick={() => onOpen('createServer')}
            className="group relative flex cursor-pointer items-center gap-2.5 rounded-[10px] py-[14px] pl-[20px] font-medium hover:bg-transparent"
          >
            <div className="absolute left-0 h-5 w-0 rounded-r-full bg-[#50FFFF] transition-all group-hover:w-[0.2rem]" />

            <Icon
              icon="solar:pen-new-square-bold-duotone"
              className="h-4 w-4 group-hover:text-[#50FFFF]"
            />
            <p className="text-xs font-normal">Create a Community</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onOpen('createServer')}
            className="group relative flex cursor-pointer items-center gap-2.5 rounded-[10px] py-[14px] pl-[20px] font-medium hover:bg-transparent"
          >
            <div className="absolute left-0 h-5 w-0 rounded-r-full bg-[#50FFFF] transition-all group-hover:w-[0.2rem]" />
            <Icon
              icon="solar:login-2-bold-duotone"
              className="h-4 w-4 group-hover:text-[#50FFFF]"
            />

            <p className="text-xs font-normal">Join the Community</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
