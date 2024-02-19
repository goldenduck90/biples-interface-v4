'use client'

import '@uploadthing/react/styles.css'

import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import { FaCamera } from 'react-icons/fa6'

import { UploadDropzone } from '@/lib/uploadthing'

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-28 w-28 border border-transparent">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="relative mt-2 flex h-28 w-28 items-center rounded-md bg-background/10 p-2">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
        >
          {value}
        </a>
        <button
          onClick={() => onChange('')}
          className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      appearance={{
        allowedContent: 'hidden',
        label: 'mt-[0.1rem]',
        button: 'mt-[0.2rem]',
      }}
      content={{
        uploadIcon({ ready, isUploading }) {
          if (ready || !ready)
            return (
              <div className="absolute bottom-0 flex w-full items-center justify-center bg-black p-4 text-white">
                <FaCamera />
              </div>
            )

          if (isUploading) return <div className="sr-only hidden"></div>
          return
        },
        label({ ready, isUploading }) {
          if (ready || !ready) return <div></div>
          if (isUploading) return <div className="sr-only hidden"></div>
          return
        },
      }}
      className="relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border-2 border-[#53ACFF] py-0 focus:ring-0"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
