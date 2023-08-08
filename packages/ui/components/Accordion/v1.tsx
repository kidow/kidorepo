'use client'

import { memo, useState } from 'react'
import { ChevronUpIcon } from 'lucide-react'
import { cn } from 'utils'

export interface Props {
  title: string
  content: string
}

function Accordion({ title, content }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [height, setHeight] = useState<number>(0)
  return (
    <li className="select-none rounded-2xl border border-neutral-200 bg-neutral-50 px-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div
        onClick={() => setIsOpen(() => !isOpen)}
        className="flex cursor-pointer items-center justify-between py-6"
      >
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
          {title}
        </h3>
        <button className="text-neutral-400">
          <ChevronUpIcon
            className={cn('h-6 w-6 duration-150', {
              '-rotate-180': isOpen
            })}
          />
        </button>
      </div>
      <section
        style={{ maxHeight: isOpen ? height : 0 }}
        className={cn(
          'overflow-hidden transition-[max-height] duration-150',
          isOpen ? 'ease-in' : 'ease-in-out'
        )}
      >
        <div
          ref={(ref) => {
            const height = ref?.scrollHeight
            if (height) setHeight(height)
          }}
          className="border-t border-neutral-200 py-6 dark:border-neutral-800"
        >
          {content}
        </div>
      </section>
    </li>
  )
}

export default memo(Accordion)
