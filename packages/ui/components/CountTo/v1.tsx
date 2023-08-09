'use client'

import { memo, useEffect, useRef, useState } from 'react'

export interface Props {
  from?: number
  to: number
  duration?: number
  className?: string
}

function CountTo({ from = 0, to, duration = 2000, className }: Props) {
  const [count, setCount] = useState(from)

  const startTimestamp = useRef<number>(0)

  useEffect(() => {
    const step = (timestamp: number) => {
      if (!startTimestamp.current) {
        startTimestamp.current = timestamp
      }
      const progress = Math.floor(timestamp - startTimestamp.current)
      const increment = ((to - from) * progress) / duration
      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
      if (to < Math.floor(from + increment)) {
        setCount(to)
      } else {
        setCount(Math.floor(from + increment))
      }
    }
    window.requestAnimationFrame(step)
  }, [from, to, duration])
  return <span className={className}>{count.toLocaleString()}</span>
}

export default memo(CountTo)
