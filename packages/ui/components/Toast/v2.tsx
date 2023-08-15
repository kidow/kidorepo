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
  const [list, setList] = useState<NToast.Item[]>([])

  const listener = useCallback(
    ({ detail }: any) =>
      setList(() => [
        ...list,
        {
          id: Math.random().toString().slice(2),
          message: detail?.message,
          type: detail?.type
        }
      ]),
    [list]
  )

  useEffect(() => {
    EventListener.once('toast', listener)
  }, [listener])

  if (!list.length) return <></>
  return createPortal(
    <div role="alertdialog">
      <ul className="fixed right-4 top-4 z-50 space-y-4">
        {list.map((item, key) => (
          <li
            key={key}
            onClick={() =>
              setList((list) => [...list.slice(0, key), ...list.slice(key + 1)])
            }
            className="animate-toast-open relative w-80 cursor-pointer select-none rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            role="alert"
          >
            <button className="absolute right-2 top-2">
              <XIcon className="h-5 w-5 dark:text-neutral-500" />
            </button>
            <div className="flex items-start gap-3">
              {item.type === 'success' && (
                <CheckCircle2Icon className="h-6 w-6 text-emerald-500" />
              )}
              {item.type === 'info' && (
                <InfoIcon className="h-6 w-6 text-sky-500" />
              )}
              {item.type === 'warn' && (
                <AlertTriangleIcon className="h-6 w-6 text-amber-500" />
              )}
              {item.type === 'error' && (
                <BanIcon className="h-6 w-6 text-red-500" />
              )}
              <p className="flex-1 break-keep pr-4 text-neutral-900 dark:text-neutral-200">
                {item.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  )
}

export default Toast
