'use client'

import { useCallback, useEffect } from 'react'
import type { RefObject } from 'react'

function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  id?: string
): void {
  const listener = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      if (
        !el ||
        el.contains(event.target as Node) ||
        id === (event.target as HTMLElement).id
      )
        return
      handler(event)
    },
    [handler, ref, id]
  )
  useEffect(() => {
    document.addEventListener('mouseup', listener)
    return () => {
      document.removeEventListener('mouseup', listener)
    }
  }, [listener])
}

export default useOnClickOutside
