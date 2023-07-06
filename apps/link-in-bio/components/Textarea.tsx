'use client'

import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

interface Props {
  register: UseFormRegisterReturn
  placeholder: string
}

export default function Textarea({ register, placeholder }: Props) {
  const id = useId()
  return (
    <div className="relative rounded-[10px] border px-3 py-2 ring-neutral-900/50 duration-150 focus-within:ring">
      <TextareaAutosize
        {...register}
        className="peer w-full resize-none bg-transparent placeholder-transparent focus:outline-none"
        id={id}
        minRows={2}
        placeholder={placeholder}
      />
      <label className="absolute -top-6 left-0 max-w-[calc(100%-24px)] cursor-text select-none truncate text-sm text-neutral-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-focus:-top-6 peer-focus:left-0 peer-focus:max-w-full peer-focus:cursor-default peer-focus:text-sm peer-focus:text-neutral-600">
        {placeholder}
      </label>
    </div>
  )
}
