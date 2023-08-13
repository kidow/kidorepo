'use client'

import { useEffect, useRef } from 'react'
import type { ForwardedRef, RefObject } from 'react'

function useCombinedRefs<T>(
  ...refs: (RefObject<T> | ForwardedRef<T>)[]
): RefObject<T> {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') ref(targetRef.current)
      // @ts-ignore
      else ref.current = targetRef.current
    })
  }, [refs])

  return targetRef
}

export default useCombinedRefs
