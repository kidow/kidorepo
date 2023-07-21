import type { FC } from 'react'
import Link from 'next/link'
import type { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getRichTextClassName } from './utils'

export interface Props extends Heading3BlockObjectResponse {}

const Heading3: FC<Props> = (block) => {
  return (
    <h2>
      {block.heading_3.rich_text.map((item, key) => {
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
    </h2>
  )
}

export default Heading3
