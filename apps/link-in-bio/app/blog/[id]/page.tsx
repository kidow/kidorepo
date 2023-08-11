import type { Metadata } from 'next'
import NextImage from 'next/image'
import { Client } from '@notionhq/client'
import dayjs from 'dayjs'

import 'dayjs/locale/ko'

import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getChildBlocksWithChildrenRecursively,
  getRichTextClassName,
  isUUID
} from '@/utils'
import type {
  BlockObjectResponse,
  CommentObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import { BackTop } from 'ui'
import urlMetadata from 'url-metadata'

import BackButton from '@/components/BackButton'
import {
  Bookmark,
  BulletedListItem,
  Callout,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  NumberedListItem,
  Paragraph,
  Quote,
  RichText,
  Table,
  Todo,
  Toggle,
  Video
} from '@/components/Block'

import Comment from './comment'
import Share from './share'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export const revalidate = 60 * 60

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  if (!isUUID(params.id)) notFound()
  try {
    const data = (await notion.pages.retrieve({
      page_id: params.id
    })) as unknown as BlogItem
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
  const results = []
  for await (const arr of getList()) {
    results.push(...arr)
  }
  return results
}

async function getPost(id: string) {
  if (!isUUID(id)) notFound()
  let isFirst = true
  let nextCursor: string
  const data: BlockObjectResponse[] = []

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
  if (!isUUID(id)) notFound()
  let isFirst = true
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

async function getData(id: string): Promise<BlogItem> {
  try {
    return (await notion.pages.retrieve({
      page_id: id
    })) as unknown as BlogItem
  } catch (err) {
    notFound()
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  if (!isUUID(params.id)) notFound()
  const [data, list, comments] = await Promise.all([
    getData(params.id),
    getPost(params.id),
    getComments(params.id)
  ])

  const render = async () => {
    const items = []
    let orderedList = []
    let unorderedList = []
    for (const block of list) {
      if (block.type === 'numbered_list_item') {
        if (block.has_children) {
          const children = await getChildBlocksWithChildrenRecursively(block.id)
          orderedList.push(
            <NumberedListItem key={block.id} {...block}>
              <ol>
                {children.map((item, key) => (
                  <li key={key}>
                    {item?.numbered_list_item?.rich_text?.map((child, i) => (
                      <RichText key={i} {...child} />
                    ))}
                  </li>
                ))}
              </ol>
            </NumberedListItem>
          )
        } else {
          orderedList.push(
            <NumberedListItem {...block} key={'ol' + block.id} />
          )
        }
      } else if (orderedList.length) {
        items.push(
          <ol key={Math.random().toString(36).slice(2)}>{orderedList}</ol>
        )
        orderedList = []
      }
      if (block.type === 'bulleted_list_item') {
        if (block.has_children) {
          const children = await getChildBlocksWithChildrenRecursively(block.id)
          unorderedList.push(
            <BulletedListItem key={block.id} {...block}>
              <ul>
                {children.map((item, key) => (
                  <li key={key}>
                    {item?.numbered_list_item?.rich_text?.map((child, i) => (
                      <RichText key={i} {...child} />
                    ))}
                  </li>
                ))}
              </ul>
            </BulletedListItem>
          )
        } else {
          unorderedList.push(
            <BulletedListItem {...block} key={'ul' + block.id} />
          )
        }
      } else if (unorderedList.length) {
        items.push(
          <ul key={Math.random().toString(36).slice(2)}>{unorderedList}</ul>
        )
        unorderedList = []
      }
      if (block.type === 'bookmark') {
        try {
          const metadata = (await urlMetadata(block.bookmark.url)) as Record<
            string,
            string
          >
          items.push(<Bookmark {...block} key={block.id} metadata={metadata} />)
        } catch (err) {
          console.log('url-metadata err: ', err)
        }
      }
      if (block.type === 'toggle') {
        if (block.has_children) {
          const children = await getChildBlocksWithChildrenRecursively(block.id)
          items.push(
            <Toggle key={block.id} {...block}>
              <section className="ml-6 hidden cursor-text select-text group-focus:block">
                {children.map((child) => {
                  if (child.type === 'paragraph') {
                    return (
                      <p key={child.id}>
                        {child.paragraph.rich_text.map((item, key) => {
                          const className = getRichTextClassName(item)
                          if (item.href) {
                            return (
                              <Link
                                href={item.href}
                                target="_blank"
                                rel="noopenner noreferrer"
                                key={key}
                              >
                                <span className={className}>
                                  {item.plain_text}
                                </span>
                              </Link>
                            )
                          }
                          return (
                            <span className={className} key={key}>
                              {item.plain_text}
                            </span>
                          )
                        })}
                      </p>
                    )
                  }
                  return null
                })}
              </section>
            </Toggle>
          )
        } else items.push(<Toggle key={block.id} {...block} />)
      }
      if (block.type === 'paragraph')
        items.push(<Paragraph key={block.id} {...block} />)
      if (block.type === 'to_do') items.push(<Todo key={block.id} {...block} />)
      if (block.type === 'heading_1')
        items.push(<Heading1 key={block.id} {...block} />)
      if (block.type === 'heading_2')
        items.push(<Heading2 key={block.id} {...block} />)
      if (block.type === 'heading_3')
        items.push(<Heading3 key={block.id} {...block} />)
      if (block.type === 'table')
        items.push(<Table key={block.id} {...block} />)
      if (block.type === 'quote')
        items.push(<Quote key={block.id} {...block} />)
      if (block.type === 'divider') items.push(<hr key={block.id} />)
      if (block.type === 'callout')
        items.push(<Callout key={block.id} {...block} />)
      if (block.type === 'image')
        items.push(<Image key={block.id} {...block} />)
      if (block.type === 'video')
        items.push(<Video key={block.id} {...block} />)
      if (block.type === 'code') items.push(<Code key={block.id} {...block} />)
    }
    return <>{items}</>
  }
  return (
    <main className="mx-auto w-full">
      <div className="py-6">
        <BackButton pathname="/blog" />
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
      <article className="my-6 pb-40">
        <div className="prose prose-slate max-w-none">{await render()}</div>
        <ul className="mb-5 mt-24 flex flex-wrap gap-2 text-sm xl:text-base">
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
        <hr className="my-12" />
        <Suspense fallback={null}>
          <ul className="mt-5 space-y-4">
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </ul>
        </Suspense>
      </article>
      <BackTop.v1 />
    </main>
  )
}
