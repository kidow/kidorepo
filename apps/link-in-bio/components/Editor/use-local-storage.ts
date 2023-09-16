import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue)
  const searchParams = useSearchParams()

  useEffect(() => {
    const c = searchParams.get('c')
    const item = window.localStorage.getItem(key)
    if (c) {
      const content = JSON.parse(decodeURIComponent(atob(c)))
      setStoredValue(content)
    } else if (item) {
      setStoredValue(JSON.parse(item))
    }
  }, [key, searchParams])

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return [storedValue, setValue]
}
