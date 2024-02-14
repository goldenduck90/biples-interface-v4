import Image from 'next/image'

interface CommunityCardProps {
  imageURL: string
  followers: number
  avatar: string
  userName: string
}

export const CommunityCard = ({
  imageURL,
  followers,
  avatar,
  userName,
}: CommunityCardProps) => {
  return (
    <div className="relative h-[236px] w-[220px] rounded-[25px]  bg-[#ffffff] bg-opacity-5 hover:animate-bounce hover:bg-opacity-0 hover:p-0">
      <Image
        src={imageURL}
        alt=""
        fill
        objectFit="contain"
        className="absolute rounded-[30px] border"
      />
      <div className="absolute ml-4 mt-6 flex w-fit flex-row gap-1 rounded-full bg-[#6D6D6D] bg-opacity-40 px-2 py-1 text-sm">
        <Image
          src="/images/home/person-icon.svg"
          alt=""
          width={16}
          height={14}
        />
        {followers}
      </div>
      <div className="absolute bottom-6 flex w-full flex-row justify-between">
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
