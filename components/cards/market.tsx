import Image from 'next/image'

interface CommunityCardProps {
  imageURL: string
  followers: number
  avatar: string
  userName: string
}

export const MarketCard = ({
  imageURL,
  followers,
  avatar,
  userName,
}: CommunityCardProps) => {
  return (
    <div className="relative h-[200px] w-[200px]">
      <Image
        src={imageURL}
        alt=""
        fill
        objectFit="contain"
        className="absolute"
      />

      <div className="absolute bottom-1 flex w-full flex-row justify-between">
        <div className="ml-4 flex flex-row gap-2">
          <Image src={avatar} alt="" width={26} height={26} />
          {userName}
        </div>
        <div className="mr-6">
          <Image
            src="/images/home/community-arrow-icon.svg"
            alt=""
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )
}
