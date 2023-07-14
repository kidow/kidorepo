import { type Metadata } from 'next'
import NextImage from 'next/image'
import { Client } from '@notionhq/client'
import classnames from 'classnames'
import dayjs from 'dayjs'

import 'dayjs/locale/ko'

import { Fragment } from 'react'
import Link from 'next/link'
import type {
  BlockObjectResponse,
  CommentObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import urlMetadata from 'url-metadata'

import BackButton from './back-button'
import Bookmark from './bookmark'
import BulletedListItem from './bulleted-list-item'
import Callout from './callout'
import Code from './code'
import Heading1 from './heading-1'
import Heading2 from './heading-2'
import Heading3 from './heading-3'
import Image from './Image'
import NumberedListItem from './numbered-list-item'
import Paragraph from './paragraph'
import Quote from './quote'
import Table from './table'
import Todo from './todo'
import Toggle from './toggle'
import Video from './video'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export const revalidate = 60 * 60 * 24

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const data = (await notion.pages.retrieve({
    page_id: params.id
  })) as unknown as NotionItem
  const TITLE = `${data.properties?.제목?.title[0]?.plain_text} | Kidow`
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

async function getComments(id: string) {
  let isFirst = true
  let nextCursor: string
  let data: CommentObjectResponse[] = []

  while (isFirst || nextCursor) {
    const { results, next_cursor } = await notion.comments.list({
      block_id: id,
      start_cursor: nextCursor
    })
    nextCursor = next_cursor
    if (isFirst) isFirst = false

    data.push(...results)
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
    <main className="mx-auto w-full">
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
        <NextImage
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
      <NextImage
        src={data?.cover?.external?.url}
        alt={data?.properties?.제목?.title[0]?.plain_text}
        width={820}
        height={450}
        priority
        className="mt-8 h-[280px] rounded-md border xl:h-[450px]"
        style={{ viewTransitionName: `blog-cover-${params.id}` }}
      />
      <article className="prose my-6 pb-40">
        {list.map(async (block) => {
          if (block.type === 'bookmark') {
            const metadata = (await urlMetadata(block.bookmark.url)) as Record<
              string,
              string
            >
            return (
              <Bookmark
                {...block}
                key={block.id}
                title={
                  metadata.title ||
                  metadata['og:title'] ||
                  metadata['twitter:title']
                }
                description={
                  metadata.description ||
                  metadata['og:description'] ||
                  metadata['twitter:description']
                }
                image={
                  metadata.image ||
                  metadata['og:image'] ||
                  metadata['twitter:image']
                }
              />
            )
          }
          if (block.type === 'table') {
            if (block.has_children) {
              // const { results } = await notion.blocks.children.list({
              //   block_id: block.id
              // })
            }
          }
          return (
            <Fragment key={block.id}>
              {block.type === 'paragraph' && <Paragraph {...block} />}
              {block.type === 'to_do' && <Todo {...block} />}
              {block.type === 'heading_1' && <Heading1 {...block} />}
              {block.type === 'heading_2' && <Heading2 {...block} />}
              {block.type === 'heading_3' && <Heading3 {...block} />}
              {block.type === 'table' && <Table {...block} />}
              {block.type === 'bulleted_list_item' && (
                <BulletedListItem {...block} />
              )}
              {block.type === 'numbered_list_item' && (
                <NumberedListItem {...block} />
              )}
              {block.type === 'toggle' && <Toggle {...block} />}
              {block.type === 'quote' && <Quote {...block} />}
              {block.type === 'divider' && <hr />}
              {block.type === 'callout' && <Callout {...block} />}
              {block.type === 'image' && <Image {...block} />}
              {block.type === 'video' && <Video {...block} />}
              {block.type === 'code' && <Code {...block} />}
            </Fragment>
          )
        })}
      </article>
    </main>
  )
}

async function getChildren() {}
