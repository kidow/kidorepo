'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div className="text-center">
      <Image
        src="https://illustrations.popsy.co/white/crashed-error.svg"
        alt="error"
        height={288}
        width={288}
        priority
        className="mx-auto"
      />
      <h2 className="my-4 text-4xl font-bold">500 Server Error</h2>
      <button
        onClick={reset}
        className="select-none rounded-[10px] border px-3 py-2 text-neutral-700"
      >
        다시 시도
      </button>
    </div>
  )
}
