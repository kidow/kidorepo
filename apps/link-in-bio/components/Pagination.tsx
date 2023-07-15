'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

import Post from '@/components/Post'

interface Props {
  nextCursor?: string
  tag?: string
}

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
  }, [ref.current])

  return [ref, entry?.isIntersecting || false]
}

export default function Pagination({ nextCursor, tag = '' }: Props) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>()
  const [list, setList] = useState<NotionItem[]>([])

  const get = async () => {
    const res = await fetch(`/api/posts?cursor=${nextCursor}&tag=${tag}`)
    const data = await res.json()
    setList([...list, data?.results || []])
  }

  useEffect(() => {
    if (nextCursor && isIntersecting) get()
  }, [isIntersecting, nextCursor])
  return (
    <>
      {list.map((item) => (
        <Post {...item} key={item.id} />
      ))}
      <div ref={ref} />
    </>
  )
}
