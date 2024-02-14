interface Props {
  description: React.ReactNode
}

export default function Description({ description }: Props) {
  return (
    <div className="mt-5 w-1/2">
      <div className="w-full font-mono text-[150%] font-thin text-white">
        Description
      </div>
      <div className="font-TT Firs Neue w-full text-[15px] text-white ">
        {description}
      </div>
    </div>
  )
}
