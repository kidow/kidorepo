'use client'

import { useEffect, useState } from 'react'
import { AlertCircleIcon, XIcon } from 'lucide-react'
import { cn } from 'utils'

export interface Props {
  type: 'success' | 'info' | 'warn' | 'error'
  message: string
  close?: boolean
}

function Alert({ type, message, close }: Props) {
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const [isDisplay, setIsDisplay] = useState<boolean>(true)

  useEffect(() => {
    if (isClosed) {
      setTimeout(() => setIsDisplay(false), 150)
    }
  }, [isClosed])
  if (!isDisplay) return null
  return (
    <div
      className={cn('flex justify-between rounded-lg border p-4', {
        'bg-red-50 text-red-500 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-200':
          type === 'error',
        'bg-blue-50 text-blue-500 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-200':
          type === 'success',
        'bg-yellow-50 text-yellow-500 dark:border-yellow-200/30 dark:bg-yellow-900/30 dark:text-yellow-200':
          type === 'warn',
        'bg-slate-50 text-slate-500 dark:border-slate-200/30 dark:bg-slate-900/30 dark:text-slate-200':
          type === 'info',
        'transition-opacity duration-150': close,
        'opacity-100': close && !isClosed,
        'opacity-0': close && isClosed
      })}
    >
      <div className="flex items-start gap-3">
        <AlertCircleIcon
          className={cn('h-5 w-5', {
            'text-red-500 dark:text-red-200': type === 'error',
            'text-blue-500 dark:text-blue-200': type === 'success',
            'text-yellow-500 dark:text-yellow-200': type === 'warn',
            'text-slate-500 dark:text-slate-200': type === 'info'
          })}
        />

        <div className="text-sm">{message}</div>
      </div>
      {close && !isClosed && (
        <XIcon
          onClick={() => setIsClosed(true)}
          className="h-5 w-5 cursor-pointer text-neutral-700 dark:text-neutral-400"
        />
      )}
    </div>
  )
}

export default Alert
