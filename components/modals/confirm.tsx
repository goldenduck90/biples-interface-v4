'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'

import { Button } from '../ui/button'

export const Confirm = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'confirm'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-10 overflow-hidden rounded-2xl bg-gradient-to-tr from-[#2e272c] to-[#151415] text-black">
        <p className="text-center text-[20px] text-white">
          Are you sure you want to buy <br />
          Claynosaur#2341 for 225 SOL?
        </p>
        <div className="flex justify-around">
          <Button className="w-2/5 bg-stone-900 text-red-700" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-2/5 bg-stone-900 text-white"
            onClick={() => onOpen('confirm')}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
