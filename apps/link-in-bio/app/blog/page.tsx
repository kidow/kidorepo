import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Client } from '@notionhq/client'

import Loader from '@/components/Loader'

import List from './list'

const TITLE = '블로그 | Kidow'
const DESCRIPTION = '웹 개발자의 이야기들을 다룹니다.'
const BASE_URL = 'https://kidow.me/blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
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

async function getData(): Promise<BlogList> {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })
  const data = (await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [{ property: '생성일', direction: 'descending' }],
    page_size: 20,
    ...(process.env.NODE_ENV === 'production'
      ? { filter: { property: '배포', checkbox: { equals: true } } }
      : {})
  })) as unknown as BlogList
  return data
}

export default async function Page() {
  const promise = getData()
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
          블로그
        </h1>
        <Link href="https://legacy.kidow.me" target="_blank">
          <span className="text-lg font-medium text-slate-500 hover:underline">
            이전 블로그
          </span>
        </Link>
      </div>
      <hr className="my-8" />
      <Suspense
        fallback={
          <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
            {Array.from({ length: 2 }).map((_, key) => (
              <Loader key={key} />
            ))}
          </ul>
        }
      >
        {/* @ts-expect-error Server Component */}
        <List promise={promise} />
      </Suspense>
    </>
  )
}
