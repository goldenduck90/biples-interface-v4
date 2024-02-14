export default function TopCollect() {
  return (
    <div className="mt-10 flex flex-row  pr-5 sm:max-w-[100%] md:max-w-[100%] lg:max-w-[100%] xl:max-w-[100%]">
      <div className="w-1/2 font-sans text-xl">Top Collections</div>
      <div className=" flex w-1/2 flex-row-reverse">
        <button
          id="states-button"
          data-dropdown-toggle="dropdown-states"
          className="z-10 inline-flex h-8 flex-shrink-0 items-center justify-between rounded-lg border border-white/5 bg-zinc-900 px-4 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-white/5 dark:bg-white/5 dark:text-white dark:hover:bg-white/5 dark:focus:ring-gray-700"
          type="button"
        >
          <svg
            className="h-4 w-5 text-indigo-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="w-1/2 font-sans text-[100%] font-thin text-white">
            Last30days
          </div>
          <svg
            className="ms-2.5 h-2.5 w-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
