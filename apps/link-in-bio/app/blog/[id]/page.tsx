import { NotionAPI } from 'notion-client'

import Renderer from './renderer'

import './page.css'
import 'prismjs/themes/prism-tomorrow.css'

import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { isUUID } from '@/utils'
import { Client } from '@notionhq/client'
import type { CommentObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getPageProperty, getPageTitle } from 'notion-utils'
import { BackTop } from 'ui'

import BackButton from '@/components/BackButton'

import Comments from './comments'
import Share from './share'

const api = new NotionAPI()
const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export const revalidate = 60 * 60 * 24

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  if (!isUUID(params.id)) notFound()
  const recordMap = await api.getPage(params.id)
  const schema = Object.values(recordMap.collection)[0]?.value?.schema
  const title = getPageTitle(recordMap)

  const metadata = recordMap.block[params.id].value
  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  const description = getPageProperty<string>('설명', block, recordMap)
  let keywords: string = ''
  Object.entries(schema).forEach(([id, value]) => {
    if (value.type === 'multi_select') {
      keywords = metadata.properties[id][0][0]
    }
  })
  const url = `https://dongwook.kim/blog/${params.id}`
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: new Date(metadata.created_time).toISOString(),
      authors: 'kidow',
      url,
      images: metadata.format?.page_cover
    },
    twitter: {
      title,
      description,
      images: metadata.format?.page_cover,
      creator: '__kidow__',
      card: 'summary_large_image'
    }
  }
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  async function* getList() {
    let isFirst = true
    let nextCursor: string

    while (isFirst || nextCursor) {
      const { results, next_cursor } = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        start_cursor: nextCursor,
        ...(process.env.NODE_ENV === 'production'
          ? { filter: { property: '배포', checkbox: { equals: true } } }
          : {})
      })
      nextCursor = next_cursor
      if (isFirst) isFirst = false

      yield results
    }
  }

  const results: any[] = []
  for await (const arr of getList()) {
    results.push(...arr)
  }
  return results.map((item) => ({ id: item.id }))
}

async function getComments(id: string) {
  let isFirst: boolean = true
  let nextCursor: string
  const data: CommentObjectResponse[] = []

  while (isFirst || nextCursor) {
    try {
      const { results, next_cursor } = await notion.comments.list({
        block_id: id,
        start_cursor: nextCursor
      })
      nextCursor = next_cursor
      if (isFirst) isFirst = false

      data.push(...results)
    } catch (err) {
      notFound()
    }
  }

  return data
}

export default async function Page({ params }: { params: { id: string } }) {
  if (!isUUID(params.id)) notFound()
  const recordMap = await api.getPage(params.id)
  const schema = Object.values(recordMap.collection)[0]?.value?.schema

  let tags: string[] = []
  const metadata = recordMap.block[params.id].value
  Object.entries(schema).forEach(([id, value]) => {
    if (value.type === 'multi_select') {
      tags = metadata.properties[id][0][0].split(',')
    }
  })

  const promise = getComments(params.id)
  return (
    <>
      <div className="py-6">
        <BackButton pathname="/blog" />
      </div>
      <time
        className="text-sm text-slate-400"
        dateTime={new Date(metadata.created_time).toISOString()}
      >
        {new Intl.DateTimeFormat('ko', { dateStyle: 'long' }).format(
          metadata.created_time
        )}
      </time>
      <h1 className="mt-2 text-4xl font-bold !leading-[1.2] text-slate-900 xl:text-5xl">
        {metadata.properties.title[0]}
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
      <img
        src={metadata.format?.page_cover}
        alt={metadata.properties.title[0]}
        width={820}
        height={450}
        draggable={false}
        className="mt-8 h-[280px] select-none rounded-md border object-contain xl:h-[450px]"
        style={{ viewTransitionName: `blog-cover-${params.id}` }}
      />
      <Renderer recordMap={recordMap} />
      <ul className="mb-5 mt-24 flex flex-wrap gap-2 text-sm xl:text-base">
        {tags.map((name) => (
          <li key={name}>
            <span className="rounded-3xl border px-3 py-2 xl:px-5 xl:py-2.5">
              {name}
            </span>
          </li>
        ))}
      </ul>
      <Share id={params.id} />
      <hr className="my-12" />
      <Suspense fallback={null}>
        {/* @ts-expect-error Server Component */}
        <Comments promise={promise} />
      </Suspense>
      <BackTop.v1 />
    </>
  )
}
