import type { FC } from 'react'
import Link from 'next/link'
import type { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getRichTextClassName } from './utils'

export interface Props extends Heading1BlockObjectResponse {}

const Heading1: FC<Props> = (block) => {
  return (
    <h1>
      {block.heading_1.rich_text.map((item, key) => {
        const className = getRichTextClassName(item)
        if (item.href)
          return (
            <Link
              key={key}
              href={item.href}
              target="_blank"
              rel="noopenner noreferrer"
            >
              <span className={className}>{item.plain_text}</span>
            </Link>
          )
        return (
          <span className={className} key={key}>
            {item.plain_text}
          </span>
        )
      })}
    </h1>
  )
}

export default Heading1
