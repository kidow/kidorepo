'use client'

import { usePagination } from 'hooks'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from 'utils'

export interface Props {
  page: number
  total: number
  size: number
  onChange: (page: number) => void
}

function Pagination({ page, total, size, onChange }: Props) {
  const range = usePagination({ page, total, size })
  if (page === 0 || !range) return <></>

  if (range.length < 2) {
    return (
      <ul className="inline-flex select-none text-sm font-medium">
        <li className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center text-neutral-500">
          <ChevronLeftIcon className="h-5 w-5" />
        </li>
        <li className="inline-flex h-9 w-9 cursor-pointer items-center justify-center">
          1
        </li>
        <li className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center text-neutral-500">
          <ChevronRightIcon className="h-5 w-5" />
        </li>
      </ul>
    )
  }

  return (
    <ul className="inline-flex select-none text-sm font-medium">
      <li
        className={cn(
          'inline-flex h-9 w-9 select-none items-center justify-center rounded-full',
          page === 1
            ? 'cursor-not-allowed text-neutral-500'
            : 'cursor-pointer text-neutral-200 hover:bg-neutral-100'
        )}
        onClick={() => {
          if (page === 1 || range.length >= 2) return
          onChange(page - 1)
        }}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </li>
      {range.map((pageNumber, key) => {
        if (pageNumber === '...') {
          return (
            <li
              key={key}
              className="inline-flex h-9 w-9 items-center justify-center"
            >
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={cn(
              'inline-flex h-9 w-9 cursor-pointer select-none items-center justify-center rounded-full',
              pageNumber === page
                ? 'font-semibold text-blue-500'
                : 'text-neutral-400 hover:bg-neutral-100'
            )}
            key={key}
            onClick={() => {
              if (pageNumber === page) return
              onChange(pageNumber)
            }}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={cn(
          'inline-flex h-9 w-9 select-none items-center justify-center rounded-full',
          total < page * size
            ? 'cursor-not-allowed text-neutral-500'
            : 'cursor-pointer text-neutral-200 hover:bg-neutral-100'
        )}
        onClick={() => {
          if (total < page * size || range.length >= 2) return
          onChange(page + 1)
        }}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </li>
    </ul>
  )
}

export default Pagination
