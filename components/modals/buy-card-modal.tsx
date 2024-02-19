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
  name: z
    .string()
    .min(1, {
      message: 'Price is required.',
    })
    .refine((name) => name !== 'general', {
      message: "Price cannot be 'general'",
    }),
})

export const BuyCardModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const { onOpen } = useModal()

  const isModalOpen = isOpen && type === 'buyCard'
  const { channel, server } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channel?.type || ChannelType.TEXT,
    },
  })

  useEffect(() => {
    if (channel) {
      form.setValue('name', channel.name)
      form.setValue('type', channel.type)
    }
  }, [form, channel])

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.patch(url, values)

      form.reset()
      router.refresh()
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
      <DialogContent className="overflow-hidden rounded-[10px] bg-stone-800 from-[#2e272c] to-[#151415] p-5 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold"></DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans font-extralight text-stone-500">
                      Price
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <img
                          src="/images/market/Mark-gr.svg"
                          alt="price"
                          className="absolute mx-[10px] h-[20px] w-[20px]"
                        />
                        <Input
                          disabled
                          className="relative border border-white bg-stone-800 pl-[40px] placeholder-white focus-visible:ring-0 focus-visible:ring-offset-0 "
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans font-extralight text-stone-500">
                      Expiration Date
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-white">
                        <div className="relative flex items-center">
                          <CalendarIcon className="absolute ml-[10px] text-white" />
                          <SelectTrigger className="relative border-0 bg-neutral-900 capitalize text-white outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select a expiration date" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {expirationDates.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="capitalize text-white"
                          >
                            {type.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="primary"
                disabled={isLoading}
                className="my-[30px] w-full bg-cyan-400 text-black"
                onClick={() => onOpen('confirm')}
              >
                Confirm the offer
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter className="h-[30px]"></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const expirationDates = [
  { value: '30 days' },
  { value: '3 months' },
  { value: '6 months' },
  { value: '1 year' },
  { value: 'forever' },
]
