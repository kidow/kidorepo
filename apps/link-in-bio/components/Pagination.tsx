'use client'

import { useEffect, useState } from 'react'
import { Spinner } from 'ui'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const get = async () => {
    if (isLoading) return
    setIsLoading(true)
    const res = await fetch(`/api/posts?cursor=${nextCursor}&tag=${tag}`)
    const data = await res.json()
    setIsLoading(false)
    setList([...list, ...(data?.results || [])])
    setNextCursor(data?.next_cursor)
  }

  useEffect(() => {
    if (nextCursor && isIntersecting) get()
  }, [isIntersecting, nextCursor, isLoading])
  return (
    <>
      {list.map((item) => (
        <Post {...item} key={item.id} />
      ))}
      <div ref={ref} />
      {isLoading && (
        <div className="flex justify-center">
          <Spinner className="h-5 w-5" />
        </div>
      )}
    </>
  )
}
