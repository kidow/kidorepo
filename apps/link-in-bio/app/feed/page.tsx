import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getChildBlocksWithChildrenRecursively,
  getRichTextClassName
} from '@/utils'
import { Client } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'
import urlMetadata from 'url-metadata'

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
  Table,
  Todo,
  Toggle,
  Video
} from '@/components/Block'

import Pagination from './pagination'
import Post from './post'

const TITLE = '개발 피드 | Kidow'
const DESCRIPTION =
  '그날 그날 느끼거나 겪었던 경험, 배움들을 간단하게 나열합니다.'
const BASE_URL = 'https://kidow.me/feed'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['til', 'feed'],
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

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

async function getList() {
  const data = (await notion.databases.query({
    database_id: '498cea7e5c4b44ba8b2b13c6a7f9e3d1',
    sorts: [{ property: '생성일', direction: 'descending' }],
    page_size: 5,
    ...(process.env.NODE_ENV === 'production'
      ? { filter: { property: '배포', checkbox: { equals: true } } }
      : {})
  })) as unknown as FeedList
  return data
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

export default async function Page() {
  const { results, next_cursor } = await getList()
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">피드</h1>
      <hr className="my-8" />
      <div className="flex flex-col gap-12 sm:gap-6 xl:gap-10">
        {results.map(async (page, index) => {
          const render = async () => {
            let items = []
            let orderedList = []
            let underedList = []
            const list = await getData(page.id)
            for (const block of list) {
              if (block.type === 'numbered_list_item') {
                if (block.has_children) {
                  const children = await getChildBlocksWithChildrenRecursively(
                    block.id
                  )
                  orderedList.push(
                    <NumberedListItem key={block.id} {...block}>
                      <ol>
                        {children.map((item, key) => (
                          <li key={key}>
                            {item?.numbered_list_item?.rich_text?.map(
                              (child, i) => (
                                <span key={i}>{child.plain_text}</span>
                              )
                            )}
                          </li>
                        ))}
                      </ol>
                    </NumberedListItem>
                  )
                } else {
                  orderedList.push(<NumberedListItem {...block} />)
                }
              } else if (orderedList.length) {
                items.push(<ol key={'ol' + block.id}>{orderedList}</ol>)
                orderedList = []
              }
              if (block.type === 'bulleted_list_item') {
                if (block.has_children) {
                  const children = await getChildBlocksWithChildrenRecursively(
                    block.id
                  )
                  underedList.push(
                    <BulletedListItem key={block.id} {...block}>
                      <ul>
                        {children.map((item, key) => (
                          <li key={key}>
                            {item?.numbered_list_item?.rich_text?.map(
                              (child, i) => (
                                <span key={i}>{child.plain_text}</span>
                              )
                            )}
                          </li>
                        ))}
                      </ul>
                    </BulletedListItem>
                  )
                } else {
                  underedList.push(<BulletedListItem {...block} />)
                }
              } else if (underedList.length) {
                items.push(<ul key={'li' + block.id}>{underedList}</ul>)
                underedList = []
              }
              if (block.type === 'bookmark') {
                const metadata = (await urlMetadata(
                  block.bookmark.url
                )) as Record<string, string>
                items.push(
                  <Bookmark {...block} key={block.id} metadata={metadata} />
                )
              }
              if (block.type === 'toggle') {
                if (block.has_children) {
                  const children = await getChildBlocksWithChildrenRecursively(
                    block.id
                  )
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
                                        <span className={classnames(className)}>
                                          {item.plain_text}
                                        </span>
                                      </Link>
                                    )
                                  }
                                  return (
                                    <span
                                      className={classnames(className)}
                                      key={key}
                                    >
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
              if (block.type === 'to_do')
                items.push(<Todo key={block.id} {...block} />)
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
              if (block.type === 'code')
                items.push(<Code key={block.id} {...block} />)
            }
            return <>{items}</>
          }
          return (
            <Fragment key={page.id}>
              <Post {...page}>{await render()}</Post>
              {index !== results.length - 1 && <hr />}
            </Fragment>
          )
        })}
        <Pagination nextCursor={next_cursor} />
      </div>
    </>
  )
}
