'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'

import Post from '@/components/Post'

import Loader from './Loader'

interface Props {
  nextCursor?: string
  tag?: string
}

export default function Pagination({ tag = '', ...props }: Props) {
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
  return (
    <>
      {list.map((item) => (
        <Post {...item} key={item.id} />
      ))}
      {isLoading ? (
        <Loader />
      ) : (
        !!nextCursor && (
          <li
            onClick={get}
            className="cursor-pointer overflow-hidden rounded-[10px] border border-slate-200 hover:border-slate-300"
          >
            <div className="flex items-center justify-center p-5 xl:p-6">
              <div className="flex items-center gap-2 text-slate-400">
                <PlusIcon />
                <span>더 보기</span>
              </div>
            </div>
          </li>
        )
      )}
    </>
  )
}
