'use client'

import { QuoteIcon } from 'lucide-react'

export default function WidgetQuote() {
  return (
    <li className="rows-span-2 col-span-2 overflow-hidden xl:col-span-4 xl:row-span-1">
      <div className="h-[175px] w-full rounded-3xl border border-neutral-200 p-5 shadow-sm xl:p-6">
        <div>
          <span className="flex h-10 w-10 items-center justify-center rounded-md border">
            <QuoteIcon className="scale-[-1]" />
          </span>
        </div>
        <div className="mt-3 text-xl font-normal italic text-neutral-600">
          더 게으르기 위해, 더 열심히 공부하는 것을 모토로 삼고 있습니다.
        </div>
      </div>
    </li>
  )
}
