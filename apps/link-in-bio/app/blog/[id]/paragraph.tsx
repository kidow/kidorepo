import type { FC } from 'react'
import Link from 'next/link'
import type { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'

import { getRichTextClassName } from './utils'

export interface Props extends ParagraphBlockObjectResponse {}

const Paragraph: FC<Props> = (block) => {
  return (
    <p className="whitespace-pre-wrap break-words">
      {block.paragraph.rich_text.map((item, key) => {
        const className = getRichTextClassName(item)
        if (item.href)
          return (
            <Link
              key={key}
              href={item.href}
              target="_blank"
              rel="noopenner referrer"
            >
              <span className={classnames(className, 'underline')}>
                {item.plain_text}
              </span>
            </Link>
          )
        return (
          <span key={key} className={className}>
            {item.plain_text}
          </span>
        )
      })}
    </p>
  )
}

export default Paragraph
