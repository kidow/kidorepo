'use client'

function useLocalStorage(key: 'item1' | 'item2') {
  const item = window.localStorage.getItem(key)
  const setItem = (value: string) => window.localStorage.setItem(key, value)

  return [item, setItem]
}

export default useLocalStorage
