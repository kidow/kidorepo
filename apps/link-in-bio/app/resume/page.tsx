import type { Metadata } from 'next'
import { getChildBlocksWithChildrenRecursively } from '@/utils'
import { Client } from '@notionhq/client'
import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  GetPageResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponse,
  TableRowBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import dayjs from 'dayjs'
import { Tooltip } from 'ui'

import {
  BulletedListItem,
  Heading2,
  Heading3,
  Paragraph,
  RichText
} from '@/components/Block'

const TITLE = '이력서 | Kidow'
const BASE_URL = 'https://dongwook.kim/resume'

export const metadata: Metadata = {
  title: TITLE,
  keywords: ['resume'],
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    title: TITLE,
    url: BASE_URL
  },
  twitter: {
    title: TITLE
  },
  metadataBase: new URL(BASE_URL)
}
const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export const revalidate = 60 * 60 * 24 * 7

async function getData(): Promise<[GetPageResponse, BlockObjectResponse[]]> {
  const [data, { results }] = await Promise.all([
    notion.pages.retrieve({
      page_id: '81617e74c35e4a98956c89717ace443b'
    }),
    notion.blocks.children.list({
      block_id: '81617e74c35e4a98956c89717ace443b'
    })
  ])
  return [data, results as BlockObjectResponse[]]
}

export default async function Page() {
  const [info, list] = await getData()

  const render = async () => {
    const items: JSX.Element[] = []
    for (const block of list) {
      if (block.type === 'column_list' && block.has_children) {
        const { results: columnList } = await notion.blocks.children.list({
          block_id: block.id
        })
        const subBlocks = await Promise.all(
          columnList.map((item) =>
            notion.blocks.children.list({ block_id: item.id })
          )
        )
        if (subBlocks.length === 3) {
          items.push(
            <section className="flex" key={block.id}>
              {subBlocks.map(({ results }, i) => (
                <section className="flex-1" key={i}>
                  <h3 className="!mt-0">
                    {(
                      results[0] as Heading3BlockObjectResponse
                    ).heading_3?.rich_text?.map((item, key) => (
                      <RichText key={key} {...item} />
                    ))}
                  </h3>
                  <ul>
                    {(
                      results.slice(1) as BulletedListItemBlockObjectResponse[]
                    ).map((subBlock) => (
                      <li key={subBlock.id}>
                        {subBlock?.bulleted_list_item?.rich_text?.map(
                          (item, key) => (
                            <RichText key={key} {...item} />
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </section>
          )
        } else if (subBlocks.length === 2) {
          let subItems = []
          let bulletList = []
          for (const subBlock of subBlocks[1]
            .results as BlockObjectResponse[]) {
            if (subBlock.type === 'heading_2') {
              subItems.push(
                <h2 className="!mt-0" key={subBlock.id}>
                  {subBlock.heading_2.rich_text.map((item, key) => (
                    <RichText key={key} {...item} />
                  ))}
                </h2>
              )
            }
            if (subBlock.type === 'bulleted_list_item') {
              if (subBlock.has_children) {
                const children = await getChildBlocksWithChildrenRecursively(
                  subBlock.id
                )
                bulletList.push(
                  <BulletedListItem key={subBlock.id} {...subBlock}>
                    <ul>
                      {children.map((item, key) => (
                        <li key={key}>
                          {item?.bulleted_list_item?.rich_text?.map(
                            (child, i) => (
                              <RichText key={i} {...child} />
                            )
                          )}
                        </li>
                      ))}
                    </ul>
                  </BulletedListItem>
                )
              } else {
                bulletList.push(
                  <BulletedListItem {...subBlock} key={subBlock.id} />
                )
              }
            } else if (bulletList.length) {
              subItems.push(<ul>{bulletList}</ul>)
              bulletList = []
            }
            if (subBlock.type === 'heading_3') {
              subItems.push(<Heading3 key={subBlock.id} {...subBlock} />)
            }
            if (subBlock.type === 'paragraph') {
              subItems.push(<Paragraph key={subBlock.id} {...subBlock} />)
            }
            if (subBlock.type === 'table') {
              const { results: tableBlocks } =
                await notion.blocks.children.list({
                  block_id: subBlock.id
                })
              subItems.push(
                <ul
                  key={subBlock.id}
                  className="flex !list-none flex-wrap gap-3 !pl-0"
                >
                  {(
                    tableBlocks[0] as TableRowBlockObjectResponse
                  ).table_row.cells.map((cell) =>
                    cell.map((item, key) => (
                      <Tooltip.v1
                        content={item.plain_text}
                        className="capitalize"
                        key={key}
                      >
                        <li className="!my-0 flex h-10 w-10 items-center justify-center rounded-[10px] border p-1">
                          <img
                            src={`/skills/${item.plain_text}.png`}
                            alt={item.plain_text}
                            className="!my-0 select-none"
                            draggable={false}
                          />
                        </li>
                      </Tooltip.v1>
                    ))
                  )}
                </ul>
              )
            }
          }
          items.push(
            <section className="mb-10 gap-10 xl:flex" key={block.id}>
              <div className="mb-2 min-w-[140px] text-neutral-700 xl:text-neutral-400">
                {(subBlocks[0].results as ParagraphBlockObjectResponse[]).map(
                  (subBlock) => (
                    <div key={subBlock.id}>
                      {subBlock.paragraph.rich_text?.map((item, key) => (
                        <RichText key={key} {...item} />
                      ))}
                    </div>
                  )
                )}
              </div>
              <div className="flex-1">{subItems}</div>
            </section>
          )
          subItems = []
        }
      }
      if (block.type === 'paragraph') {
        items.push(<Paragraph key={block.id} {...block} />)
      }
      if (block.type === 'heading_2') {
        items.push(<Heading2 key={block.id} {...block} />)
      }
      if (block.type === 'heading_3') {
        items.push(<Heading3 key={block.id} {...block} />)
      }
    }
    return <>{items}</>
  }
  return (
    <div className="prose-sm xl:prose prose-neutral !max-w-none">
      <p className="text-sm italic text-neutral-400">
        {dayjs((info as any).last_edited_time).format(
          'YYYY년 M월 D일 업데이트됨.'
        )}
      </p>
      <h1>이력서</h1>
      {await render()}
    </div>
  )
}
