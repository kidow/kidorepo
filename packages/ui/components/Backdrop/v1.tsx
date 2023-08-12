'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { EventListener } from 'utils'

import { Spinner } from '../..'

function Backdrop() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const listener = useCallback(({ detail }: any) => {
    setIsOpen(detail)
    if (detail) document.body.style.overflow = 'hidden'
    else document.body.removeAttribute('style')
  }, [])

  useEffect(() => {
    EventListener.add('backdrop', listener)
    return () => EventListener.remove('backdrop', listener)
  }, [listener])
  if (!isOpen) return <></>
  return createPortal(
    <div role="progressbar">
      <div className="fixed inset-0 z-40 cursor-progress bg-black opacity-30" />
      <span className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 cursor-progress">
        <Spinner.v1 className="h-10 w-10 text-neutral-50" />
      </span>
    </div>,
    document.body
  )
}

export default memo(Backdrop)
