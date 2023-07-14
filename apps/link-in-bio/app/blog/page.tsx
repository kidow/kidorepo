import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Client } from '@notionhq/client'
import dayjs from 'dayjs'

import 'dayjs/locale/ko'

const TITLE = '블로그 | Kidow'
const DESCRIPTION = '웹 개발자의 이야기들을 다룹니다.'
const BASE_URL = 'https://kidow.me/blog'

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

async function getData(cursor?: string): Promise<NotionList> {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })
  const data = (await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [{ property: '생성일', direction: 'ascending' }],
    page_size: 20,
    ...(process.env.NODE_ENV === 'production'
      ? { filter: { property: '배포', checkbox: { equals: true } } }
      : {})
  })) as unknown as NotionList
  return data
}

export default async function Page() {
  const { results } = await getData()
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
          블로그
        </h1>
        <Link
          href="https://legacy.kidow.me"
          target="_blank"
          className="text-lg font-medium text-slate-500 hover:underline"
        >
          이전 블로그
        </Link>
      </div>
      <hr className="my-8" />
      <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {results.map((item, key) => {
          return (
            <li key={key}>
              <article className="group relative rounded-[10px] border">
                <div className="overflow-hidden">
                  <Image
                    src={item.cover?.external?.url}
                    alt="Title"
                    width={390}
                    height={260}
                    priority
                    className="h-[260px] w-[390px] duration-200 group-hover:scale-125"
                    style={{ viewTransitionName: `blog-cover-${key + 1}` }}
                  />
                </div>
                <div className="space-y-2 p-5 xl:p-6">
                  <h2 className="after:bg-primary relative inline-block overflow-hidden text-2xl font-extrabold text-slate-900 after:absolute after:bottom-1 after:left-0 after:h-1.5 after:w-full after:origin-bottom-right after:-translate-x-full after:opacity-50 after:transition-transform after:duration-150 after:content-[''] after:group-hover:translate-x-0">
                    {item.properties?.제목?.title[0]?.plain_text}
                  </h2>
                  <p className="line-clamp-2 text-slate-500">
                    {item.properties?.설명?.rich_text[0]?.plain_text}
                  </p>
                  <time className="text-sm text-slate-400">
                    {dayjs(item.created_time)
                      .locale('ko')
                      .format('YYYY년 M월 D일')}
                  </time>
                </div>
                <Link href={`/blog/${item.id}`} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            </li>
          )
        })}
      </ul>
    </>
  )
}
