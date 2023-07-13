import { type Metadata } from 'next'
import Image from 'next/image'
import { Client } from '@notionhq/client'
import classnames from 'classnames'
import dayjs from 'dayjs'

import 'dayjs/locale/ko'

import { Fragment } from 'react'
import Link from 'next/link'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import BackButton from '@/components/BackButton'

import Paragraph from './paragraph'
import Todo from './todo'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const data = (await notion.pages.retrieve({
    page_id: params.id
  })) as unknown as NotionItem
  const TITLE = data.properties?.제목?.title[0]?.plain_text
  const DESCRIPTION = data.properties?.설명?.rich_text[0]?.plain_text
  const IMAGE = data.cover?.external?.url
  const KEYWORDS = data.properties?.태그?.multi_select
    .map((item) => item.name)
    .join(', ')
  const URL = `https://kidow.me/blog/${data.id}`
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
    alternates: {
      canonical: URL
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: 'article',
      publishedTime: data.created_time,
      authors: 'kidow',
      url: URL,
      images: IMAGE,
      tags: KEYWORDS
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: IMAGE,
      creator: '__kidow__',
      card: 'summary_large_image'
    }
  }
}

async function* getList() {
  let isFirst = true
  let nextCursor: string

  while (isFirst || nextCursor) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      start_cursor: nextCursor
    })
    nextCursor = next_cursor
    if (isFirst) isFirst = false

    yield results
  }
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  let results = []
  for await (const arr of getList()) {
    results.push(...arr)
  }
  return results
}

async function getData(id: string) {
  let isFirst = true
  let nextCursor: string
  let data: BlockObjectResponse[] = []

  while (isFirst || nextCursor) {
    const { results, next_cursor } = await notion.blocks.children.list({
      block_id: id,
      start_cursor: nextCursor
    })
    nextCursor = next_cursor
    if (isFirst) isFirst = false

    data.push(...(results as BlockObjectResponse[]))
  }

  return data
}

export default async function Page({ params }: { params: { id: string } }) {
  const [data, list] = await Promise.all([
    notion.pages.retrieve({
      page_id: params.id
    }) as unknown as NotionItem,
    getData(params.id)
  ])
  return (
    <div className="fixed left-1/2 top-0 mx-auto w-full max-w-prose -translate-x-1/2 bg-white px-6 pt-5 xl:static xl:max-w-none xl:translate-x-0 xl:px-0 xl:pt-0">
      <div className="py-6">
        <BackButton />
      </div>
      <time dateTime="2023-07-07" className="text-sm text-slate-400">
        {dayjs(data.created_time).locale('ko').format('YYYY년 M월 D일')}
      </time>
      <h1 className="mt-2 text-4xl font-bold text-slate-900 xl:text-5xl">
        {data.properties?.제목?.title[0]?.plain_text}
      </h1>
      <div className="mt-4 flex items-center space-x-4 text-sm xl:hidden">
        <Image
          src="/avatar.png"
          alt="avatar"
          height={40}
          width={40}
          className="aspect-auto rounded-full border"
        />
        <div className="leading-tight">
          <div className="font-medium text-slate-900">kidow</div>
          <div className="text-xs text-slate-400">@kidow</div>
        </div>
      </div>
      <Image
        src={data?.cover?.external?.url}
        alt={data?.properties?.제목?.title[0]?.plain_text}
        width={820}
        height={450}
        className="mt-8 h-[280px] rounded-md border xl:h-[450px]"
        style={{ viewTransitionName: `blog-cover-${params.id}` }}
      />
      <article className="prose my-6">
        {list.map((block) => {
          if (block.type === 'to_do') {
            console.log(block.to_do)
          }
          return (
            <Fragment key={block.id}>
              {block.type === 'paragraph' && <Paragraph {...block} />}
              {block.type === 'to_do' && <Todo {...block} />}
            </Fragment>
          )
        })}
      </article>
    </div>
  )
}
