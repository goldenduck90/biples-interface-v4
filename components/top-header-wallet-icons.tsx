'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { FaBell } from 'react-icons/fa'
import { FaCog } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { IoCopy } from 'react-icons/io5'
import { TbLogout } from 'react-icons/tb'

import { SocketIndicator } from './socket-indicator'

interface TopHeaderWalletIconsProps {}

function truncateWalletAddress(address: string, length = 8) {
  if (address) {
    if (address?.length <= length * 2) {
      return address
    }
    return `${address.substring(0, length)}...${address.substring(
      address.length - length,
    )}`
  }
}

const TopHeaderWalletIcons: React.FC<TopHeaderWalletIconsProps> = (props) => {
  const { wallets, select, wallet, publicKey } = useWallet()

  const [textCopied, setTextCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(wallet?.adapter.publicKey?.toBase58()!)
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

  const handleSignOut = async () => {
    wallet?.adapter.disconnect()
    await signOut()
    redirect('/sign-in')
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="icon-box flex h-[50px] w-[50px] cursor-pointer items-center justify-center transition-all delay-100 hover:opacity-80">
            <FaEnvelope />
          </div>
          <div className="icon-box flex h-[50px] w-[50px] cursor-pointer items-center justify-center transition-all delay-100 hover:opacity-80">
            <FaBell />
          </div>
          <div className="icon-box flex h-[50px] w-[50px] cursor-pointer items-center justify-center transition-all delay-100 hover:opacity-80">
            <FaCog />
          </div>
        </div>
        <div className="opacity-10">
          <SocketIndicator />
        </div>

        <div className="flex items-center gap-3">
          {wallet && (
            <div className=" icon-box flex h-[50px] cursor-pointer items-center justify-center gap-3 px-5 py-2 transition-all delay-100 hover:opacity-80">
              <img
                src={wallet.adapter.icon}
                alt={`${wallet.adapter.name} icon`}
                className="h-7 w-7"
              />
              <div className="flex flex-col ">
                <div className="text-xs text-[#565A7F]">Solana</div>
                <div className="text-sm">
                  {truncateWalletAddress(
                    wallet.adapter.publicKey?.toBase58()!,
                    6,
                  )}
                </div>
              </div>
              <div
                onClick={() => copyToClipboard()}
                className="ml-10  flex h-[29px] w-[29px] cursor-pointer items-center justify-center rounded-lg bg-[#686868] transition-all delay-75 hover:opacity-80"
              >
                {textCopied ? (
                  <>
                    <FaCheckCircle />
                  </>
                ) : (
                  <>
                    {' '}
                    <IoCopy />
                  </>
                )}
              </div>
            </div>
          )}
          <div
            onClick={() => handleSignOut()}
            className="icon-box flex h-[50px] w-[50px] cursor-pointer items-center justify-center transition-all delay-100 hover:opacity-80"
          >
            <TbLogout />
          </div>
        </div>
      </div>
    </>
  )
}

export default TopHeaderWalletIcons
