'use client'

import { useEffect, useState } from 'react'

import useIntersectionObserver from '@/hooks/use-intersection-observer'
import Post from '@/components/Post'

interface Props {
  nextCursor?: string
  tag?: string
}

export default function Pagination({ tag = '', ...props }: Props) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>()
  const [list, setList] = useState<BlogItem[]>([])
  const [nextCursor, setNextCursor] = useState(props.nextCursor)

  const get = async () => {
    const res = await fetch(`/api/posts?cursor=${nextCursor}&tag=${tag}`)
    const data = await res.json()
    setList([...list, data?.results || []])
    setNextCursor(data?.next_cursor)
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
