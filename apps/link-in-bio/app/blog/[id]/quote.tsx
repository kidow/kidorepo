import type { FC } from 'react'
import Link from 'next/link'
import type { QuoteBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'

import { getRichTextClassName } from './utils'

export interface Props extends QuoteBlockObjectResponse {}

const Quote: FC<Props> = (block) => {
  return (
    <blockquote>
      {block.quote.rich_text.map((item, key) => {
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
    </blockquote>
  )
}

export default Quote
