'use client'

import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])

  return [ref, entry?.isIntersecting || false]
}

export default useIntersectionObserver
