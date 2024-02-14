interface Props {
  onChange: (value: string) => void
}

export default function ItemTab({ onChange }: Props) {
  return (
    <div className="mt-7 flex flex-row">
      <button
        onClick={() => onChange('overview')}
        className="border-cyan-900 px-4 py-2 text-white  focus:border-b-4 focus:border-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
      >
        Overwiew
      </button>
      <button
        onClick={() => onChange('properties')}
        className="border-cyan-900 px-4  py-2 text-white  focus:border-b-4 focus:border-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
      >
        Preperties
      </button>
      <button
        onClick={() => onChange('offers')}
        className="border-cyan-900 px-4  py-2 text-white  focus:border-b-4 focus:border-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
      >
        Offers
      </button>
      <button
        onClick={() => onChange('activity')}
        className="border-cyan-900 px-4 py-2 text-white  focus:border-b-4 focus:border-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
      >
        Activity
      </button>
    </div>
  )
}
