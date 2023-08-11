'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn, EventListener } from 'utils'

export interface Props extends ReactProps {
  position?: 'left' | 'top' | 'right' | 'bottom'
}

function Drawer({ position }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      window.removeEventListener('keydown', onEscape)
    }
  }, [])

  const listener = useCallback(({ detail }: any) => {
    setIsOpen(!!detail)
  }, [])

  useEffect(() => {
    EventListener.once('drawer', listener)
  }, [listener])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen, onEscape])
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
            className={cn(
              'duration-200',
              isOpen ? 'fixed inset-0 z-20 bg-black/50' : 'bg-white'
            )}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              'transition-all',
              isOpen ? 'fixed z-30 bg-white' : 'h-0 w-0 opacity-0',
              {
                'top-0': position === 'top',
                'right-0': position === 'right',
                'bottom-0': position === 'bottom',
                'left-0': position === 'left',
                'top-0 w-80': position === 'left' || position === 'right',
                'h-80': position === 'top' || position === 'bottom'
              }
            )}
          >
            asd
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Drawer
