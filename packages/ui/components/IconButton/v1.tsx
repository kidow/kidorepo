'use client'

import { cloneElement, useMemo } from 'react'
import type { ReactElement } from 'react'
import { cn } from 'utils'

export interface Props extends ReactProps {
  className?: string
  onClick?: () => void
}

function IconButton({ children, onClick, className }: Props) {
  const clone = useMemo(
    () =>
      cloneElement(children as ReactElement, {
        className: 'text-neutral-400 h-4 w-4 dark:text-neutral-500'
      }),
    [children]
  )
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center justify-center rounded-full border border-neutral-300 bg-white p-2 hover:brightness-105 active:brightness-90 disabled:cursor-not-allowed dark:border-neutral-500 dark:bg-neutral-800',
        className
      )}
    >
      {clone}
    </button>
  )
}

export default IconButton
