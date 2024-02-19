'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import React, { createContext } from 'react'

export const WalletContext = createContext<any>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet()
  return (
    <WalletContext.Provider value={publicKey ? publicKey.toBase58() : null}>
      {children}
    </WalletContext.Provider>
  )
}
