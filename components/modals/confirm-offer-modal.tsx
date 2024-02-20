'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChannelType } from '@prisma/client'
import axios from 'axios'
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useModal } from '@/hooks/use-modal-store'

const formSchema = z.object({
  price: z
    .number()
    .min(1, {
      message: 'Price is required.',
    })
    .refine((price) => price !== 0, {
      message: 'Price cannot be 0',
    }),
})

export const ConfirmOfferModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const { onOpen } = useModal()

  const isModalOpen = isOpen && type === 'confirmOffer'
  const { channel, server } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 85,
      date: '30',
    },
  })

  useEffect(() => {
    form.setValue('price', 85)
    form.setValue('date', '30')
  }, [form, channel])

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const url = qs.stringifyUrl({
      //   url: `/api/channels/${channel?.id}`,
      //   query: {
      //     serverId: server?.id,
      //   },
      // })
      // await axios.patch(url, values)

      // form.reset()
      // router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-3xl bg-zinc-800 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 px-6 py-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-extralight text-stone-500">
                      Price
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <img
                          src="/images/server/marketplace/sol-grey.svg"
                          alt="price"
                          className="absolute z-30 ml-4 h-[10px] w-[12px]"
                        />
                        <Input
                          className="relative border border-[#6d6d6d] bg-stone-800 pl-8 focus-visible:ring-0 focus-visible:ring-offset-0 "
                          placeholder="85"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-extralight text-stone-500">
                      Expiration Date
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <div className="relative flex items-center">
                          <CalendarIcon
                            className="absolute z-30 ml-4"
                            color="#6d6d6d"
                            size={16}
                          />
                          <SelectTrigger className="relative border-0 bg-neutral-900 capitalize text-white outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue
                              placeholder="Select a expiration date"
                              className="relative z-30 text-white"
                            />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {expirationDates.map((date) => (
                          <SelectItem
                            key={date.key}
                            value={date.value}
                            className="capitalize text-white"
                          >
                            {date.key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                disabled={isLoading}
                className="w-full rounded-xl bg-[#50FFFF] py-2 font-bold text-black hover:bg-opacity-80"
                onClick={handleClose}
              >
                Confirm the offer
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const expirationDates = [
  { key: '30 days', value: '30' },
  { key: '3 months', value: '90' },
  { key: '6 months', value: '180' },
  { key: '1 year', value: '365' },
  { key: 'Forever', value: 'all' },
]
