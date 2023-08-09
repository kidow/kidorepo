'use client'

import { useId, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { useOnClickOutside } from 'hooks'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon
} from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn, twoDigitsNumber } from 'utils'

export interface Props {
  value: string
  onChange: (value: string) => void
}

function MonthPicker({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [date, setDate] = useState(dayjs(value || dayjs().format('YYYY-MM')))

  const ref = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const id = useId()

  useOnClickOutside(targetRef, () => setIsOpen(false), id)
  return (
    <>
      <div
        className="group relative inline-flex items-center rounded border border-neutral-300 hover:border-neutral-600"
        ref={ref}
        id={id}
        onClick={() => setIsOpen(true)}
      >
        <input
          readOnly
          className="w-36 rounded border-none px-3 py-2 text-sm outline-none"
          placeholder="YYYY.MM"
          value={value ? dayjs(value).format('YYYY.MM') : ''}
        />
        {!!value && (
          <XCircleIcon
            onClick={(e) => {
              e.stopPropagation()
              onChange('')
              setIsOpen(false)
            }}
            className="invisible absolute right-10 mr-2 h-5 w-5 cursor-pointer text-neutral-300 group-hover:visible"
          />
        )}
        <button className="border-l border-neutral-300 bg-white p-2 group-hover:border-neutral-600">
          <CalendarIcon className="h-5 w-5 text-neutral-300 group-hover:text-neutral-600" />
        </button>
      </div>
      {isOpen &&
        createPortal(
          <div
            role="presentation"
            style={{
              left: ref.current!.getBoundingClientRect().left,
              top:
                window.scrollY +
                ref.current!.getBoundingClientRect().top +
                ref.current!.clientHeight,
              position: 'absolute',
              zIndex: '9999'
            }}
          >
            <div
              ref={targetRef}
              className="w-64 select-none rounded bg-white drop-shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-300 px-2">
                <button
                  className="py-3"
                  onClick={() => setDate(dayjs(date).add(-1, 'year'))}
                >
                  <ChevronLeftIcon className="h-4 w-4 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-500" />
                </button>
                <span className="font-semibold">
                  {dayjs(date).format('YYYY')}
                </span>
                <button
                  className="py-3"
                  onClick={() => setDate(dayjs(date).add(1, 'year'))}
                >
                  <ChevronRightIcon className="h-4 w-4 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-500" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 px-2 py-4">
                {Array.from({ length: 12 }).map((_, key) => (
                  <div
                    key={key}
                    className={cn(
                      'grid h-6 cursor-pointer place-items-center rounded text-sm',
                      dayjs(value).format('YYYY-MM') ===
                        dayjs(date).format(`YYYY-${twoDigitsNumber(key + 1)}`)
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-neutral-200'
                    )}
                    onClick={() => {
                      onChange(
                        dayjs(date).format(`YYYY-${twoDigitsNumber(key + 1)}`)
                      )
                      setIsOpen(false)
                    }}
                  >
                    {key + 1}월
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default MonthPicker
