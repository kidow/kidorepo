'use client'

import { Noto_Sans_KR } from 'next/font/google'
import classnames from 'classnames'

const notoSansKr = Noto_Sans_KR({
  weight: '700',
  subsets: ['latin']
})

export default function WidgetQuote() {
  return (
    <li className="rows-span-2 col-span-2 overflow-hidden xl:col-span-4 xl:row-span-1">
      <div className="h-[175px] w-full rounded-3xl border border-neutral-200 p-5 shadow-sm xl:p-6">
        <div className={classnames('text-6xl font-bold', notoSansKr.className)}>
          “
        </div>
        <div className="text-xl font-normal italic text-neutral-600">
          더 게으르기 위해 더 열심히 공부하는 것을 모토로 삼고 있습니다.
        </div>
      </div>
    </li>
  )
}
