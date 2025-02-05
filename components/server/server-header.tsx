'use client'

import { MemberRole } from '@prisma/client'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Trash } from 'lucide-react'
import { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { BsTwitterX } from 'react-icons/bs'
import { FaCheckCircle, FaCog } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { IoCloseSharp, IoCopy } from 'react-icons/io5'
import { TbWorld } from 'react-icons/tb'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useModal } from '@/hooks/use-modal-store'
import type { ServerWithMembersWithProfiles } from '@/types'

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles
  role?: MemberRole
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal()
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR
  const [open, setOpen] = useState(false)
  const [textCopied, setTextCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTextCopied(true)
        setTimeout(() => {
          setTextCopied(false)
        }, 5000)
      })
      .catch((err) => {
        console.error('Could not copy text: ', err)
      })
  }

  const closeMenu = () => {
    setOpen(false)
  }

  const ref = useDetectClickOutside({ onTriggered: closeMenu })

  const toggleOpen = () => {
    setOpen(!open)
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <div className="relative flex items-center gap-10">
      <button
        onClick={toggleOpen}
        className="server-card flex items-center justify-center gap-2 border-none px-4 py-2 font-normal transition"
      >
        <img
          src={server.imageUrl}
          className=" h-[36px] w-[36px] rounded-full "
        />
        {server.name}
        {open ? (
          <ChevronDown className="ml-auto h-5 w-5 rotate-180" />
        ) : (
          <ChevronDown className="ml-auto h-5 w-5 transform " />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              ref={ref}
              variants={variants}
              transition={{ duration: 0.5 }}
              className="server-box absolute top-0  z-50 h-auto w-[210px]"
            >
              <div className="relative z-50 flex w-full items-center justify-between p-3">
                <div className="cursor-pointer hover:opacity-80">
                  <FaCog />
                </div>
                <div
                  onClick={() => setOpen(false)}
                  className="cursor-pointer hover:opacity-80"
                >
                  <IoCloseSharp size="23" />
                </div>
              </div>
              <div className="relative z-10 -mt-8 flex flex-col items-center gap-2 p-3">
                <img
                  src={server.imageUrl}
                  className=" h-[58px] w-[58px] rounded-full "
                />
                <div className="font-500">{server.name}</div>
                <div className="flex w-full items-center justify-between gap-5">
                  <div className="flex-1 rounded-full bg-white/5 px-3 py-2 font-light">
                    <div className="flex items-center gap-2 text-xs font-medium text-white">
                      <FaUser />

                      {server.members.length}
                    </div>
                  </div>
                  <div className="flex-1 rounded-full bg-white/5 px-3 py-2 font-light">
                    <div className="flex items-center gap-2 text-xs font-medium text-white">
                      <div className="h-3 w-3 rounded-full bg-green-700"></div>
                      {server.members.length}
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2 flex w-full items-center justify-center gap-5 border-y border-[#53ACFF] border-opacity-20 py-3">
                <a
                  href="https://twitter.com/"
                  className="cursor-pointer hover:opacity-80"
                >
                  <BsTwitterX />
                </a>
                <a
                  href="https://twitter.com/"
                  className="cursor-pointer hover:opacity-80"
                >
                  <TbWorld />
                </a>
              </div>
              <div className="flex items-center justify-center p-4 pt-2">
                <div className="flex w-full items-center justify-between rounded-full bg-white/5 px-3 py-2">
                  <ScrollArea className="w-[125px]">
                    <div className="text-sm font-light">
                      bp.me/claynosaurzscrollbartest
                    </div>
                    <ScrollBar
                      orientation="horizontal"
                      className="rounded bg-white/10"
                    />
                  </ScrollArea>
                  <div
                    onClick={() =>
                      copyToClipboard('bp.me/claynosaurzscrollbartest')
                    }
                    className="cursor-pointer hover:opacity-80"
                  >
                    {textCopied ? (
                      <>
                        <FaCheckCircle />
                      </>
                    ) : (
                      <>
                        <IoCopy />
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isModerator && (
                <button
                  onClick={() => onOpen('invite', { server })}
                  className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
                >
                  Invite People
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => onOpen('deleteServer', { server })}
                  className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-rose-500"
                >
                  Delete Server
                  <Trash className="ml-auto h-4 w-4" />
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

{
  /*
   <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="flex items-center justify-center gap-2 px-4 py-2 font-normal transition server-card">
            <img
              src={server.imageUrl}
              className=" rounded-full h-[36px] w-[36px] "
            />
            {server.name}
            <ChevronDown className="w-5 h-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("invite", { server })}
              className="px-3 py-2 text-sm text-indigo-600 cursor-pointer dark:text-indigo-400"
            >
              Invite People
              <UserPlus className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("editServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Server Settings
              <Settings className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("members", { server })}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Manage Members
              <Users className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("createChannel")}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Create Channel
              <PlusCircle className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("deleteServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer text-rose-500"
            >
              Delete Server
              <Trash className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("leaveServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer text-rose-500"
            >
              Leave Server
              <LogOut className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    */
}
