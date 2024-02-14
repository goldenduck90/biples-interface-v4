import properties from './dataPropertes.json'

export default function Properties() {
  return (
    <div>
      {properties.map((resource, index) => (
        <div
          key={index}
          className="my-3 flex items-center justify-around rounded-[15px] border bg-[#101010F7] p-5 opacity-95"
        >
          <div className="w-1/4 font-mono text-[18px] font-thin text-white">
            {resource.section}
          </div>
          <div className="w-1/4 text-center font-mono text-[18px] font-thin text-white">
            {resource.color}
          </div>
          <div className="flex w-1/4 justify-end">
            <button
              type="button"
              className="h-[30px] w-[60px] items-center rounded-[15px] bg-cyan-950 text-center  text-[18px] text-sm font-medium  text-cyan-400 hover:bg-gradient-to-br focus:bg-cyan-400 focus:bg-gradient-to-br focus:from-green-400  focus:to-blue-600 focus:text-black focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
            >
              {resource.percent}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
