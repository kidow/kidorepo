'use client'

import { LinkIcon, MessageSquareIcon } from 'lucide-react'
import { uuidToId } from 'notion-utils'
import { toast } from 'utils'

interface Props {
  id: string
}

export default function Share({ id }: Props) {
  return (
    <div className="mt-10 flex items-center justify-between">
      <button
        onClick={() => {
          if (typeof window.navigator === 'undefined') {
            toast.warn('복사가 되지 않는 브라우저입니다.')
            return
          }
          window.navigator.clipboard
            .writeText(`https://dongwook.kim/blog/${id}`)
            .then(() => toast.success('링크가 복사되었습니다.'))
        }}
        className="flex items-center gap-2.5 rounded-lg bg-slate-100 px-4 py-2.5 font-medium text-slate-500"
      >
        <LinkIcon size={16} />
        <span>공유</span>
      </button>
      <button
        onClick={() =>
          window.open(`https://kidow.notion.site/${uuidToId(id)}`, '_blank')
        }
        className="flex items-center gap-2.5 rounded-lg bg-slate-100 px-4 py-2.5 font-medium text-slate-500"
      >
        <MessageSquareIcon size={16} />
        <span>댓글 남기기</span>
      </button>
    </div>
  )
}
