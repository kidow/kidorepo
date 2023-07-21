'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getChildBlocksWithChildrenRecursively,
  getRichTextClassName
} from '@/utils'
import classnames from 'classnames'
import urlMetadata from 'url-metadata'

import useIntersectionObserver from '@/hooks/use-intersection-observer'
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

import Post from './post'

interface Props {
  nextCursor?: string
}

export default function Pagination(props: Props) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>()
  const [list, setList] = useState<FeedItem[]>([])
  const [nextCursor, setNextCursor] = useState<string>(props.nextCursor)

  const get = async () => {
    const res = await fetch(`/api/feeds?cursor=${nextCursor}`)
    const data = await res.json()
    setList([...list, data?.results || []])
    setNextCursor(data?.next_cursor)
  }

  const render = async (id: string) => {
    let items = []
    let orderedList = []
    let underedList = []
    const res = await fetch(`/api/feed?id=${id}`)
    const list = await res.json()

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
                      <span key={i}>{child.plain_text}</span>
                    ))}
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
          const children = await getChildBlocksWithChildrenRecursively(block.id)
          underedList.push(
            <BulletedListItem key={block.id} {...block}>
              <ul>
                {children.map((item, key) => (
                  <li key={key}>
                    {item?.numbered_list_item?.rich_text?.map((child, i) => (
                      <span key={i}>{child.plain_text}</span>
                    ))}
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
        const metadata = (await urlMetadata(block.bookmark.url)) as Record<
          string,
          string
        >
        items.push(<Bookmark {...block} key={block.id} metadata={metadata} />)
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
                                <span className={classnames(className)}>
                                  {item.plain_text}
                                </span>
                              </Link>
                            )
                          }
                          return (
                            <span className={classnames(className)} key={key}>
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

  useEffect(() => {
    if (nextCursor && isIntersecting) get()
  }, [isIntersecting, nextCursor])
  return (
    <>
      {list.map(async (item) => (
        <Post {...item} key={item.id}>
          {await render(item.id)}
        </Post>
      ))}
      <div ref={ref} />
    </>
  )
}
