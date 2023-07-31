'use client'

import { memo, type FC } from 'react'
import { usePathname } from 'next/navigation'
import { LinkIcon, MessageSquareIcon } from 'lucide-react'
import { toast } from 'sonner'

export interface Props {
  url: string
}

const Share: FC<Props> = ({ url }) => {
  const pathname = usePathname()
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => {
          if (typeof window.navigator === 'undefined') {
            toast('복사가 되지 않는 브라우저입니다.')
            return
          }
          window.navigator.clipboard
            .writeText('https://kidow.me' + pathname)
            .then(() => toast('링크가 복사되었습니다.'))
        }}
        className="flex items-center gap-2.5 rounded-lg bg-slate-100 px-4 py-2.5 font-medium text-slate-500"
      >
        <LinkIcon size={16} />
        <span>공유</span>
      </button>
      <button
        onClick={() => window.open(url, '_blank')}
        className="flex items-center gap-2.5 rounded-lg bg-slate-100 px-4 py-2.5 font-medium text-slate-500"
      >
        <MessageSquareIcon size={16} />
        <span>댓글 남기기</span>
      </button>
    </div>
  )
}

export default memo(Share)
