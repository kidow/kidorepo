import { Fragment } from 'react'
import type { Metadata } from 'next'
import { Client } from '@notionhq/client'
import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  GetPageResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponse,
  TableRowBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Tooltip } from 'ui'

const TITLE = '이력서 | Kidow'
const BASE_URL = 'https://kidow.me/resume'

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
  return (
    <div className="prose-sm xl:prose prose-neutral">
      <p className="text-sm italic text-neutral-400">
        {dayjs((info as any).last_edited_time).format(
          'YYYY년 M월 D일 업데이트됨.'
        )}
      </p>
      <h1>이력서</h1>
      {list.map(async (block) => {
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
            return (
              <section className="flex" key={block.id}>
                {subBlocks.map(({ results }, i) => (
                  <section className="flex-1" key={i}>
                    <h3>
                      {(
                        results[0] as Heading3BlockObjectResponse
                      ).heading_3.rich_text?.map((item, key) => (
                        <span key={key}>{item.plain_text}</span>
                      ))}
                    </h3>
                    <ul>
                      {(
                        results.slice(
                          1
                        ) as BulletedListItemBlockObjectResponse[]
                      ).map((subBlock) => (
                        <li key={subBlock.id}>
                          {subBlock.bulleted_list_item.rich_text?.map(
                            (item, key) => (
                              <span
                                className={classnames({
                                  'font-semibold': item.annotations.bold
                                })}
                                key={key}
                              >
                                {item.plain_text}
                              </span>
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
            return (
              <section className="mb-10 gap-10 xl:flex" key={block.id}>
                <section className="mb-2 min-w-[140px] text-neutral-700 xl:text-neutral-400">
                  {(subBlocks[0].results as ParagraphBlockObjectResponse[]).map(
                    (subBlock) => (
                      <div key={subBlock.id}>
                        {subBlock.paragraph.rich_text?.map((item, key) => (
                          <span key={key}>{item.plain_text}</span>
                        ))}
                      </div>
                    )
                  )}
                </section>
                <section className="flex-1">
                  {(subBlocks[1].results as BlockObjectResponse[]).map(
                    async (subBlock) => {
                      if (
                        subBlock.type === 'image' &&
                        subBlock.image.type === 'external'
                      ) {
                        return (
                          <div
                            className="flex items-center gap-3"
                            key={subBlock.id}
                          >
                            <img
                              className="!my-0 h-[72px] w-[72px]"
                              src={subBlock.image.external.url}
                              alt={subBlock.image.caption[0].plain_text}
                            />
                            <span
                              className={classnames({
                                'cursor-pointer hover:underline':
                                  !!subBlock.image.caption[0].href
                              })}
                            >
                              {subBlock.image.caption[0].plain_text}
                            </span>
                            {subBlock.image.caption[0].href && (
                              <ArrowUpRight size={16} />
                            )}
                          </div>
                        )
                      }
                      if (subBlock.type === 'paragraph') {
                        return (
                          <p key={subBlock.id}>
                            {subBlock.paragraph.rich_text?.map((item, key) => (
                              <span key={key}>{item.plain_text}</span>
                            ))}
                          </p>
                        )
                      }
                      if (subBlock.type === 'toggle') {
                        const { results: toggleBlocks } =
                          await notion.blocks.children.list({
                            block_id: subBlock.id
                          })
                        return (
                          <button
                            className="group block text-left focus:outline-none"
                            key={subBlock.id}
                          >
                            <div className="inline-flex items-center gap-1">
                              <span>주요 성과</span>
                              <ChevronDown
                                size={16}
                                className="duration-150 group-focus:rotate-180"
                              />
                            </div>
                            <ul className="hidden cursor-text select-text group-focus:block">
                              {(toggleBlocks as BlockObjectResponse[]).map(
                                (toggleBlock) => {
                                  if (toggleBlock.type === 'bulleted_list_item')
                                    return (
                                      <li key={toggleBlock.id}>
                                        {toggleBlock.bulleted_list_item.rich_text?.map(
                                          (item, key) => (
                                            <span key={key}>
                                              {item.plain_text}
                                            </span>
                                          )
                                        )}
                                      </li>
                                    )
                                  return null
                                }
                              )}
                            </ul>
                          </button>
                        )
                      }
                      if (subBlock.type === 'table') {
                        const { results: tableBlocks } =
                          await notion.blocks.children.list({
                            block_id: subBlock.id
                          })
                        return (
                          <ul
                            key={subBlock.id}
                            className="flex !list-none flex-wrap gap-3 !pl-0"
                          >
                            {(
                              tableBlocks[0] as TableRowBlockObjectResponse
                            ).table_row.cells.map((cell) =>
                              cell.map((item, key) => (
                                <li
                                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border p-1"
                                  key={key}
                                >
                                  <Tooltip
                                    content={item.plain_text}
                                    className="capitalize"
                                  >
                                    <img
                                      src={`/skills/${item.plain_text}.png`}
                                      alt={item.plain_text}
                                      className="!my-0 select-none"
                                      draggable={false}
                                    />
                                  </Tooltip>
                                </li>
                              ))
                            )}
                          </ul>
                        )
                      }
                      return null
                    }
                  )}
                </section>
              </section>
            )
          } else return null
        }
        return (
          <Fragment key={block.id}>
            {block.type === 'paragraph' && (
              <p>
                {block.paragraph.rich_text?.map((item, key) => (
                  <span key={key}>{item.plain_text}</span>
                ))}
              </p>
            )}
            {block.type === 'heading_2' && (
              <h2>
                {block.heading_2.rich_text?.map((item, key) => (
                  <span key={key}>{item.plain_text}</span>
                ))}
              </h2>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
