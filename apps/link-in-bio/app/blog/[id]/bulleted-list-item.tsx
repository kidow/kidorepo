import type { FC } from 'react'
import Link from 'next/link'
import type { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getRichTextClassName } from './utils'

export interface Props
  extends BulletedListItemBlockObjectResponse,
    ReactProps {}

const BulletedListItem: FC<Props> = (block) => {
  return (
    <li>
      {block.bulleted_list_item.rich_text.map((item, key) => {
        const className = getRichTextClassName(item)
        return (
          <span key={key} className={className}>
            {item.href ? (
              <Link href={item.href} target="_blank" rel="noopenner noreferrer">
                <span>{item.plain_text}</span>
              </Link>
            ) : (
              item.plain_text
            )}
          </span>
        )
      })}
      {block.children}
    </li>
  )
}

export default BulletedListItem
