'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModal } from '@/hooks/use-modal-store'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Community name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Community image is required.',
  }),
})

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'createServer'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)

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
      <DialogContent className="overflow-hidden rounded-2xl bg-gradient-to-tr from-[#2e272c] to-[#151415]">
        {/* <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-2 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="mx-auto h-[50px] max-w-[300px] rounded-lg border border-foreground/50 bg-transparent text-center text-foreground placeholder:text-foreground/20 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Community Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-center text-xs font-normal" />
                  </FormItem>
                )}
              />

              <div className="flex w-full flex-col gap-1">
                <Button
                  className="mx-auto h-[50px] min-w-[300px] rounded-lg bg-[#50FFFF] text-black hover:bg-[#40CACA]"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="mr-3 h-5 w-5"
                    />
                  )}
                  <span>Create</span>
                </Button>
                <span className="text-center text-[8px] font-extralight">
                  You can add additional information in the community settings
                  after creation.
                </span>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
