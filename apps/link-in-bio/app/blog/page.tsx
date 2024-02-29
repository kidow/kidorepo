import type { Metadata } from 'next'
import Link from 'next/link'
import { Client } from '@notionhq/client'

import Post from '@/components/Post'

import List from './list'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  const TITLE = '블로그 | Kidow'
  const DESCRIPTION = '웹 개발자의 이야기들을 다룹니다.'
  const BASE_URL = 'https://dongwook.kim/blog'
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['blog', 'nextjs'],
    alternates: {
      canonical: BASE_URL
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: BASE_URL
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION
    },
    metadataBase: new URL(BASE_URL)
  }
}

interface Props {
  searchParams: {
    dev: string
  }
}

export default async function Page({ searchParams }: Props) {
  const { results, next_cursor } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [{ property: '생성일', direction: 'descending' }],
    page_size: 20,
    ...(process.env.NODE_ENV === 'production' || searchParams.dev === 'true'
      ? { filter: { property: '배포', checkbox: { equals: true } } }
      : {})
  })
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
          블로그
        </h1>
        <Link href="https://legacy.dongwook.kim" target="_blank">
          <span className="text-lg font-medium text-slate-500 hover:underline">
            이전 블로그
          </span>
        </Link>
      </div>
      <hr className="my-8" />
      <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {results.map((page: any, key) => (
          <Post key={key} {...page} />
        ))}
        <List nextCursor={next_cursor} />
      </ul>
    </>
  )
}
