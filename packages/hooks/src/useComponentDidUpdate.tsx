'use client'

import { useEffect, useRef } from 'react'

function useComponentDidUpdate(cb: Function, state: any) {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      cb()
    } else {
      mounted.current = true
    }
  }, [state, cb])
}

export default useComponentDidUpdate
