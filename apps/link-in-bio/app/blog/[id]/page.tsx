import { type Metadata } from 'next'
import Image from 'next/image'

import BackButton from '@/components/BackButton'

export const metadata: Metadata = {
  openGraph: {
    type: 'article',
    publishedTime: '2023-01-01T00:00:00.000Z',
    authors: ['kidow']
  }
}

export default function Page() {
  return (
    <div className="fixed left-1/2 top-0 mx-auto w-full max-w-prose -translate-x-1/2 bg-white px-6 pt-5 xl:static xl:max-w-none xl:translate-x-0 xl:px-0 xl:pt-0">
      <div className="py-6">
        <BackButton />
      </div>
      <time dateTime="2023-07-07" className="text-sm text-slate-400">
        2023년 7월 7일
      </time>
      <h1 className="leading-tighter mt-2 text-4xl font-bold text-slate-900 xl:text-5xl">
        7번째 블로그를 만들게 된 이유
      </h1>
      <div className="mt-4 flex items-center space-x-4 text-sm xl:hidden">
        <Image
          src="/avatar.png"
          alt="avatar"
          height={40}
          width={40}
          className="blog aspect-auto rounded-full border"
        />
        <div className="leading-tight">
          <div className="font-medium text-slate-900">kidow</div>
          <div className="text-xs text-slate-400">@kidow</div>
        </div>
      </div>
      <Image
        src="https://illustrations.popsy.co/white/creative-work.svg"
        alt="title"
        width={820}
        height={450}
        className="mt-8 h-[280px] rounded-md border xl:h-[450px]"
      />
    </div>
  )
}
