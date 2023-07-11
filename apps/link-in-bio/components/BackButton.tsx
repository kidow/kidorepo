'use client'

import { memo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

function BackButton() {
  const { back, push } = useRouter()
  return (
    <button
      onClick={() => (document.referrer ? push('/blog') : back())}
      className="flex h-10 w-10 items-center justify-center rounded-[10px] border"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  )
}

export default memo(BackButton)
