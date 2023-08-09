'use client'

import { useCallback, useEffect } from 'react'
import { XIcon } from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn } from 'utils'

export interface Props extends ReactProps, ModalProps {}

function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-lg',
  title,
  description,
  padding,
  footer
}: Props) {
  const onEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        window.removeEventListener('keydown', onEscape)
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen, onEscape])
  if (!isOpen) return <></>
  return createPortal(
    <div
      className="fixed inset-0 z-30 overflow-y-auto"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex min-h-screen items-center justify-center p-0 text-center md:block">
        <div
          className="fixed inset-0 bg-black/30 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />
        <span
          className="hidden h-screen align-middle md:inline-block"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={cn(
            'my-8 inline-block w-full overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all',
            maxWidth
          )}
        >
          <header className="border-t-4 border-blue-500 bg-white dark:bg-neutral-800">
            <div className="flex items-center border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex-1">
                <h1 className="text-xl font-semibold">{title}</h1>
                {!!description && (
                  <p className="mt-1 text-sm text-neutral-400">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-900"
              >
                <XIcon className="h-5 w-5 text-neutral-800 dark:text-neutral-100" />
              </button>
            </div>
          </header>
          <div
            className={cn('bg-white dark:bg-neutral-800', {
              'px-7 py-6': padding,
              'rounded-b-lg': !footer
            })}
          >
            {children}
          </div>
          {footer && (
            <footer className="rounded-b-lg border-t bg-white px-7 py-4 dark:border-neutral-700 dark:bg-neutral-800">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
