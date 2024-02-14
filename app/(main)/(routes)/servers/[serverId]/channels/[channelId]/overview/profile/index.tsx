export default function Profile() {
  return (
    <div className="sm:w-full lg:mt-5 lg:flex lg:flex-row">
      <div className="rounded-[25px] lg:w-1/2 ">
        <img
          src="/images/market/community.png"
          className="mx-auto h-[465px] w-full xl:w-[600px]"
        />
      </div>
      <div className="mt-5 px-9 lg:w-1/2">
        {/* name */}
        <div className="flex w-full flex-row items-center">
          <img
            src="/images/market/TopRight.png"
            className="lg:w-6 xl:w-8"
          ></img>

          <div className="ml-1">
            <div className="w-3/4 font-mono text-[100%] font-thin text-white ">
              Claynopsaurz
            </div>
            <div className="w-3/4 pt-1 font-mono text-[70%] font-thin text-[#6D6D6D] ">
              @Claynopsaurz
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row items-center">
          <div className="w-1/2 pt-5 font-sans text-[250%] font-thin text-white lg:text-[180%] xl:text-[250%] ">
            Claynopsaurz
          </div>
          <div className="ml-10 mt-8 h-[30px] w-1/5 items-center rounded-[15px] bg-zinc-900">
            <div className="w-full text-center font-sans text-[100%] font-thin text-white ">
              #2341
            </div>
          </div>
        </div>
        <hr className="mt-2 w-full pt-0.5 dark:bg-cyan-950" />

        {/* owner */}
        <div className="mt-4 flex w-full flex-row items-center lg:flex lg:flex-col xl:flex xl:flex-row">
          <div className="flex w-full flex-row items-center gap-1">
            <img
              src="/images/market/TopRight.png"
              className="mt-0.5 h-8 w-8 rounded-[20px]  border-none"
            />
            <div className="flex flex-col">
              <p className="w-full pt-1 font-mono text-[80%] font-thin text-[#6D6D6D] ">
                Owner
              </p>
              <p className="w-full font-mono text-[100%] font-thin text-white ">
                Andrew Jackson
              </p>
            </div>
          </div>

          <div className="flex w-full flex-row items-center gap-1">
            <img
              src="/images/market/Avatar.svg"
              className="mt-0.5 h-8 w-8 rounded-[25px] border-none "
            />
            <div className="flex flex-col">
              <p className="w-full pt-1 font-mono text-[80%] font-thin text-[#6D6D6D] ">
                Owner
              </p>
              <p className="w-full font-mono text-[100%] font-thin text-white ">
                Andrew Jackson
              </p>
            </div>
          </div>
        </div>
        {/* price */}
        <div className="mt-5 w-full rounded-[15px] bg-zinc-900 p-10">
          <div className="w-3/4 pt-1 font-mono text-[100%] font-thin text-[#6D6D6D] ">
            Price
          </div>

          <div className="flex:row m-5 flex w-full items-center font-mono font-thin lg:flex lg:flex-col xl:flex xl:flex-row">
            <div className="flex w-1/2 flex-row items-center">
              <img
                className="mb-1 h-[35px] w-[35px]"
                src="/images/market/Mark.svg"
              />
              <div className="ml-3 w-1/4 text-[170%] font-thin text-white ">
                225.31
              </div>
            </div>
            <div className="flex w-1/2 flex-row-reverse items-center">
              <div className="w-1/5 font-mono text-[100%] font-thin text-[#6D6D6D] ">
                155
              </div>
              <img
                className="h-4 w-4 rounded-[10px] border"
                src="/images/market/Mark-gr.svg"
                alt="Mark"
              />
              <div className="w-3/4 pr-1 text-right font-mono text-[100%] font-thin text-[#6D6D6D] ">
                Floor price
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="mt-5 flex w-full flex-row items-center justify-between xl:justify-around">
          <button className="xl:[430px] h-[50px] w-4/5 items-center rounded-[20px] rounded-lg bg-cyan-400 bg-gradient-to-r text-center text-[30px] font-medium text-black hover:bg-blue-500 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800">
            Buy now
          </button>
          <button type="button">
            <img
              className="h-[55px] w-[55px] rounded-[17px] border border-0 border-none bg-[#ffffff] bg-opacity-5 p-[10px] text-center hover:bg-blue-700 hover:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
              src="/images/market/hammer-wh.svg"
              alt="Mark"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
