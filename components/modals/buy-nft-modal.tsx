'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'

export const BuyNftModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'buyNft'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-w-[340px] flex-col gap-4 rounded-2xl bg-zinc-800">
        <p className="text-center text-base text-white">
          Are you sure you want to buy <br />
          Claynosaur#2341 for 225 SOL?
        </p>
        <div className="flex justify-around">
          <button
            className="rounded-lg bg-[#10101090] px-8 py-2 text-[#FF5050] hover:bg-[#10101065]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-[#10101090] px-8  py-2 text-white hover:bg-[#10101065]"
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
