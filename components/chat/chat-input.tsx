'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Member, Message, Profile } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { FiPlusCircle } from 'react-icons/fi'
import { IoSend } from 'react-icons/io5'
import * as z from 'zod'

import { EmojiPicker } from '@/components/emoji-picker'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModal } from '@/hooks/use-modal-store'

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}
interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type: 'conversation' | 'channel'
}

const formSchema = z.object({
  content: z.string().min(1),
})

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const content = form.watch('content')

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await axios.post(url, values)

      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen('messageFile', { apiUrl, query })}
                    className="absolute  left-6 top-[22px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full p-1 transition hover:opacity-80"
                  >
                    <FiPlusCircle size={'24'} />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="rounded-xl border-2 border-[#283643] bg-transparent px-14 py-6 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={`Write a message...`}
                    {...field}
                  />
                  <div className="absolute right-8 top-7 flex items-center gap-5">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                    {isLoading ? (
                      <>
                        <div className="animate-pulse cursor-not-allowed text-white/70 transition delay-75">
                          <IoSend size="24" />
                        </div>
                      </>
                    ) : (
                      <>
                        {content && content.trim() !== '' ? (
                          <div
                            onClick={form.handleSubmit(onSubmit)}
                            className="cursor-pointer transition delay-75 hover:opacity-80 "
                          >
                            <IoSend size="24" />
                          </div>
                        ) : (
                          <div className="cursor-not-allowed text-white/10 transition delay-75">
                            <IoSend size="24" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div></div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
