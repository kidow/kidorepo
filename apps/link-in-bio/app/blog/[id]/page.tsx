import { type Metadata } from 'next'
import NextImage from 'next/image'
import { Client } from '@notionhq/client'
import dayjs from 'dayjs'

import 'dayjs/locale/ko'

import { Fragment } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
import Comment from './comment'
import Heading1 from './heading-1'
import Heading2 from './heading-2'
import Heading3 from './heading-3'
import Image from './Image'
import NumberedListItem from './numbered-list-item'
import Paragraph from './paragraph'
import Quote from './quote'
import Share from './share'
import Table from './table'
import Todo from './todo'
import Toggle from './toggle'
import Video from './video'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export const revalidate = 60 * 60 * 24 * 7

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      params.id
    )
  ) {
    notFound()
  }
  try {
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
  } catch (err) {
    notFound()
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

async function getPost(id: string) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  ) {
    notFound()
  }
  let isFirst = true
  let nextCursor: string
  let data: BlockObjectResponse[] = []

  while (isFirst || nextCursor) {
    try {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: id,
        start_cursor: nextCursor
      })
      nextCursor = next_cursor
      if (isFirst) isFirst = false

      data.push(...(results as BlockObjectResponse[]))
    } catch (err) {
      notFound()
    }
  }

  return data
}

async function getComments(id: string) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  ) {
    notFound()
  }
  let isFirst = true
  let nextCursor: string
  let data: CommentObjectResponse[] = []

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

async function getData(id: string): Promise<NotionItem> {
  try {
    return (await notion.pages.retrieve({
      page_id: id
    })) as unknown as NotionItem
  } catch (err) {
    notFound()
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      params.id
    )
  ) {
    notFound()
  }
  const [data, list, comments] = await Promise.all([
    getData(params.id),
    getPost(params.id),
    getComments(params.id)
  ])
  return (
    <main className="mx-auto w-full">
      <div className="py-6">
        <BackButton />
      </div>
      <time dateTime={data.created_time} className="text-sm text-slate-400">
        {dayjs(data.created_time).locale('ko').format('YYYY년 M월 D일')}
      </time>
      <h1 className="mt-2 text-4xl font-bold !leading-[1.2] text-slate-900 xl:text-5xl">
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
        draggable={false}
        className="mt-8 h-[280px] select-none rounded-md border xl:h-[450px]"
        style={{ viewTransitionName: `blog-cover-${params.id}` }}
      />
      <article className="prose prose-slate my-6 max-w-none pb-40">
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
          if (block.type === 'toggle') {
            if (block.has_children) {
              const { results } = await notion.blocks.children.list({
                block_id: block.id
              })
              return (
                <Toggle
                  {...block}
                  subBlocks={results as BlockObjectResponse[]}
                />
              )
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
        <ul className="not-prose mt-24 flex list-none flex-wrap gap-2 pl-0 text-sm xl:text-base">
          {data?.properties?.태그?.multi_select?.map(({ name }, key) => (
            <li className="mb-4 mr-2" key={key}>
              <Link href={`/tags/${name}`}>
                <span className="rounded-3xl border px-3 py-2 hover:bg-stone-100 xl:px-5 xl:py-2.5">
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {/* @ts-ignore */}
        <Share url={data?.public_url} />
        <hr />
        <ul className="not-prose list-none space-y-4 pl-0">
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </ul>
      </article>
    </main>
  )
}
