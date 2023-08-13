'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

function useContentEditable(initialValue: string = '') {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState<string>(initialValue)

  const onInput = (e: ChangeEvent<HTMLDivElement>) =>
    setValue(e.target.innerText)

  const setContent = (content: string) => {
    if (!ref.current) return
    ref.current.innerText = content
    setValue(content)
  }

  useEffect(() => {
    if (initialValue) setContent(initialValue)
  }, [initialValue])

  return { content: value, setContent, onInput, ref }
}

export default useContentEditable
