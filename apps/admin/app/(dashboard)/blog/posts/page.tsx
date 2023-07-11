'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Pagination } from 'components'
import { backdrop } from 'services'

export default function Page() {
  const [list, setList] = useState<
    Database['public']['Tables']['posts']['Row'][]
  >([])
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const supabase = createClientComponentClient<Database>()

  const get = async (page: number = 1) => {
    backdrop(true)
    const { data, count, error } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(10)
    backdrop(false)
    if (error) {
      console.log(error)
      setList([])
      setTotal(0)
      setPage(1)
      return
    }
    setList(data || [])
    setTotal(count || 0)
    setPage(page)
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">블로그 포스트</h2>
        <Link
          href="/blog/posts/create"
          className="rounded-md bg-stone-200 px-3 py-2"
        >
          새 포스트
        </Link>
      </div>
      <main className="space-y-4">
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border px-3 py-2 ring-blue-500 duration-150 focus:ring"
            placeholder="검색"
            autoComplete="off"
          />
        </div>
        <Pagination
          page={page}
          total={total}
          size={10}
          onChange={(page) => get(page)}
        />
        <ul className="space-y-4">
          {list.map((item, key) => (
            <li key={key}>
              <Link
                href={`/blog/posts/${item.id}`}
                className="flex items-center gap-4"
              >
                <img
                  src="https://illustrations.popsy.co/white/creative-work.svg"
                  alt={item.title}
                  width={150}
                  height={150}
                />
                <div className="space-y-2">
                  <div className="text-2xl font-semibold">{item.title}</div>
                  <div className="line-clamp-2">{item.description}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
