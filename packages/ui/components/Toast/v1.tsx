'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  AlertTriangleIcon,
  BanIcon,
  CheckCircle2Icon,
  InfoIcon,
  XIcon
} from 'lucide-react'
import { createPortal } from 'react-dom'
import { EventListener } from 'utils'

function Toast() {
  const [list, setList] = useState<
    Array<{ id: string; message: string; type: NToast.Type }>
  >([])

  const onMessage = useCallback(
    ({ detail }: any) =>
      setList(
        detail.id
          ? list.filter((item) => item.id !== detail.id)
          : [
              ...list,
              {
                id: Math.random().toString(36).slice(2),
                message: detail?.message,
                type: detail.type
              }
            ]
      ),
    [list]
  )

  useEffect(() => {
    EventListener.once('toast', onMessage)
  }, [list, onMessage])

  if (!list.length) return <></>
  return createPortal(
    <div role="alertdialog">
      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 space-y-4">
        {list.map((item) => (
          <div
            className="animate-fade-up w-72 cursor-pointer rounded bg-white px-4 py-2 dark:bg-black"
            id={item.id}
            key={item.id}
            onClick={() => EventListener.emit('toast', { id: item.id })}
            role="alert"
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
            }}
          >
            <div className="flex items-center gap-2">
              <span>
                {item.type === 'success' && (
                  <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                )}
                {item.type === 'info' && (
                  <InfoIcon className="h-5 w-5 text-blue-500" />
                )}
                {item.type === 'warn' && (
                  <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
                )}
                {item.type === 'error' && (
                  <BanIcon className="h-5 w-5 text-red-500" />
                )}
              </span>
              <span className="flex-1 select-none text-sm">
                {item?.message}
              </span>
              <XIcon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}

export default Toast
