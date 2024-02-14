interface Props {
  name: string
  image: string
}

export default function MarketCollectName({ name, image }: Props) {
  return (
    <div className="gird-strt 2 col-span-4 grid w-full">
      <div className="flex w-full flex-row items-center px-9">
        <img src={image} className="lg:w-6 xl:h-8 xl:w-8"></img>
        <div className="ml-2 w-3/4 font-sans font-thin  text-white lg:text-[70%] xl:text-[100%]">
          {name}
        </div>
      </div>
    </div>
  )
}
