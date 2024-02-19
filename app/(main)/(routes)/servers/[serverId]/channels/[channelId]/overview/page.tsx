'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect } from 'react'

import { appConstants } from '@/lib/constants'

import Activity from './Activity/Activity'
import SampleActivities from './Activity/dataActivite.json'
import Description from './Description/Description'
import ItemTab from './ItemTab'
import Offers from './Offers/Offers'
import SampleOffers from './Offers/Offers.json'
import Profile from './profile'
import Properties from './Properties/Properties'

const MyNFTsPage: React.FC = () => {
  const { publicKey } = useWallet()
  const [tabIndex, setTabIndex] = React.useState('overview')

  const getAssetsByOwner = async () => {
    const response = await fetch(appConstants.HELIUS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: publicKey?.toBase58(),
          page: 1, // Starts at 1
          limit: 1000,
        },
        displayOptions: {
          showUnverifiedCollections: false,
          showCollectionMetadata: true,
          showGrandTotal: false,
          showFungible: false,
          showNativeBalance: false,
          showInscription: false,
        },
      }),
    })
    const { result } = await response.json()
    console.log('Assets by Owner: ', result.items)
  }

  useEffect(() => {
    publicKey && getAssetsByOwner()
  }, [publicKey])
  return (
    <div className="server-card h-full w-full overflow-y-auto p-10">
      <Profile />
      <div>
        <ItemTab onChange={setTabIndex} />
        <hr className="w-full pt-px dark:bg-cyan-950 xl:w-1/2" />

        {/* footer_body */}
        {tabIndex === 'overview' && (
          <Description
            description={
              <span>
                Lorem lpsum is simply dummy text of printin and typesetting
                industry. <b>Lorem</b> Ipsum has been the industry&apos;s
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged.
              </span>
            }
          />
        )}
        {tabIndex === 'properties' && (
          <div className="mt-5  w-full lg:w-1/2">
            <Properties />
          </div>
        )}

        {tabIndex === 'offers' && (
          <div className="mt-5 w-full lg:w-1/2">
            <Offers offers={SampleOffers} />
          </div>
        )}

        {tabIndex === 'activity' && (
          <div className="mt-5">
            <Activity activities={SampleActivities} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MyNFTsPage
