'use client'

import { memo } from 'react'
import { ArrowUpIcon } from 'lucide-react'

function BackTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-[10px] border"
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  )
}

export default memo(BackTop)
