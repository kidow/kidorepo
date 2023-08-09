'use client'

import { forwardRef } from 'react'
import type { DetailedHTMLProps, DialogHTMLAttributes, ReactNode } from 'react'
import { XIcon } from 'lucide-react'
import { cn } from 'utils'

export interface Props
  extends DetailedHTMLProps<
    DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  title?: string
  onClose?: () => void
  description?: string
  padding?: boolean
  footer?: ReactNode
  maxWidth?:
    | 'max-w-screen-2xl'
    | 'max-w-screen-xl'
    | 'max-w-screen-lg'
    | 'max-w-screen-md'
    | 'max-w-screen-sm'
    | 'max-w-full'
    | 'max-w-8xl'
    | 'max-w-7xl'
    | 'max-w-6xl'
    | 'max-w-5xl'
    | 'max-w-4xl'
    | 'max-w-3xl'
    | 'max-w-2xl'
    | 'max-w-xl'
    | 'max-w-lg'
    | 'max-w-md'
    | 'max-w-sm'
    | 'max-w-xs'
}

const Dialog = forwardRef<HTMLDialogElement, Props>(
  (
    {
      onClose,
      title,
      description,
      padding,
      footer,
      maxWidth = 'max-w-lg',
      children
    },
    ref
  ) => {
    return (
      <dialog
        role="dialog"
        ref={ref}
        className={cn('w-full rounded-lg p-0 backdrop:bg-black/30', maxWidth)}
        onClick={onClose}
      >
        <header className="border-t-4 border-neutral-900 bg-white dark:bg-neutral-800">
          {!!title && (
            <div className="flex items-center border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex-1">
                <h1 className="text-xl font-semibold">{title}</h1>
                {!!description && (
                  <p className="mt-1 text-sm text-neutral-400">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-neutral-300 dark:hover:bg-neutral-900"
              >
                <XIcon className="h-5 w-5 text-neutral-800 dark:text-neutral-100" />
              </button>
            </div>
          )}
        </header>
        <div
          className={cn('bg-white dark:bg-neutral-800', {
            'px-7 py-6': padding,
            'rounded-b-lg': !footer
          })}
        >
          {children}
        </div>
        {!!footer && (
          <footer className="rounded-b-lg border-t bg-white px-7 py-4 dark:border-neutral-700 dark:bg-neutral-800">
            {footer}
          </footer>
        )}
      </dialog>
    )
  }
)

export default Dialog
