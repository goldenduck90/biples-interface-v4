import { currentProfile } from '@/lib/current-profile'

export const ProfileDrawer = async () => {
  const profile = await currentProfile()

  if (!profile) {
    return <>Not connected</>
  }

  const progress = 70

  return (
    <div className="flex w-full flex-col items-center gap-2 border-b border-[#53acff28] px-2 py-4 text-primary">
      <div className="flex flex-col items-center">
        <img
          className="shadow-blue w-[70px] rounded-full border-4 border-[#53ACFF]"
          src={profile.imageUrl}
        />
        <div className="text-lg font-bold">{profile.name}</div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl border border-[#283643]  p-2">
        <div className="xl:text-xs 2xl:text-sm">
          Level: <b className="text-[#53ACFF]">1</b>
        </div>
        <div className="w-full rounded-lg bg-white/20">
          <div
            className="progress-grad h-2 rounded-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-center text-[#384E63] xl:text-xs 2xl:text-sm">
          XP: 1000/1150 XP
        </div>
      </div>
    </div>
  )
}
