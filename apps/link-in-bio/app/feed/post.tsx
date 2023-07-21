import {
  getChildBlocksWithChildrenRecursively,
  getRichTextClassName
} from '@/utils'
import { Client } from '@notionhq/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import dayjs from 'dayjs'

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

import 'dayjs/locale/ko'

import Link from 'next/link'
import classnames from 'classnames'
import urlMetadata from 'url-metadata'

interface Props extends FeedItem, ReactProps {}

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

async function getPost(id: string) {
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

export default function Post({ children, ...page }: Props) {
  return (
    <li>
      <article className="rounded-[10px] border p-5 xl:p-6">
        <time dateTime={page.created_time} className="text-sm text-neutral-400">
          {dayjs(page.created_time).locale('ko').format('YYYY년 M월 D일')}
        </time>
        <h2 className="text-2xl font-semibold">
          {page.properties?.제목?.title[0]?.plain_text}
        </h2>
        <div className="prose prose-slate mt-4">{children}</div>
        <ul className="mt-5 flex flex-wrap gap-2 text-sm">
          {page?.properties?.태그?.multi_select.map(({ name }, key) => (
            <li key={key}>
              <span className="rounded-3xl border px-3 py-2 text-slate-500">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </li>
  )
}
