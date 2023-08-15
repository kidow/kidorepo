'use client'

import { useCallback, useEffect } from 'react'
import { XIcon } from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn } from 'utils'

export interface Props extends ReactProps {
  isOpen: boolean
  onClose: () => void
  position?: 'left' | 'top' | 'right' | 'bottom'
}

function Drawer({ isOpen, onClose, position = 'left', children }: Props) {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else if (document.body.style.overflow === 'hidden') {
      document.body.style.removeProperty('overflow')
    }
  }, [isOpen])
  return (
    <>
      {createPortal(
        <div
          aria-labelledby="drawer-title"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            className={cn('backdrop-blur-sm duration-200', {
              'fixed inset-0 z-20': isOpen
            })}
            onClick={onClose}
          />
          <div
            className={cn(
              'data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-30 transition duration-300 ease-in-out',
              {
                'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top top-0':
                  position === 'top',
                'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right right-0':
                  position === 'right',
                'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom bottom-0':
                  position === 'bottom',
                'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left left-0':
                  position === 'left',

                'left-0': position === 'top' || position === 'bottom',
                'top-0': position === 'left' || position === 'right',

                'translate-x-0':
                  (position === 'left' || position === 'right') && isOpen,
                'translate-y-0':
                  (position === 'top' || position === 'bottom') && isOpen,
                '-translate-y-full': position === 'top' && !isOpen,
                'translate-x-full': position === 'right' && !isOpen,
                'translate-y-full': position === 'bottom' && !isOpen,
                '-translate-x-full': position === 'left' && !isOpen
              }
            )}
            data-state={isOpen ? 'open' : 'closed'}
          >
            <div
              className={cn(
                'relative bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900',
                {
                  'border-b': position === 'top',
                  'border-l': position === 'right',
                  'border-t': position === 'bottom',
                  'border-r': position === 'left',
                  'h-80 w-screen': position === 'top' || position === 'bottom',
                  'h-screen w-80 overflow-auto':
                    position === 'left' || position === 'right'
                }
              )}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-md border dark:border-neutral-700"
              >
                <XIcon className="h-4 w-4" />
              </button>
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Drawer
