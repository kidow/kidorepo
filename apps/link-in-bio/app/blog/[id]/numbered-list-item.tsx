import type { FC } from 'react'
import Link from 'next/link'
import { type NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'

export interface Props extends NumberedListItemBlockObjectResponse {}

const NumberedListItem: FC<Props> = (block) => {
  return (
    <ol>
      {block.numbered_list_item.rich_text.map((item, key) => {
        const className = classnames({
          'font-semibold': item.annotations.bold,
          italic: item.annotations.italic,
          'line-through': item.annotations.strikethrough,
          underline: item.annotations.underline,
          'rounded-[3px] bg-gray-100 px-[5.44px] py-[2.72px] text-[85%] text-red-500':
            item.annotations.code,
          'text-red-500': item.annotations.color === 'red',
          'text-orange-500': item.annotations.color === 'orange',
          'text-yellow-500': item.annotations.color === 'yellow',
          'text-green-500': item.annotations.color === 'green',
          'text-blue-500': item.annotations.color === 'blue',
          'text-purple-500': item.annotations.color === 'purple',
          'text-pink-500': item.annotations.color === 'pink',
          'text-gray-500': item.annotations.color === 'gray',
          'text-yellow-900': item.annotations.color === 'brown',
          'bg-red-100': item.annotations.color === 'red_background',
          'bg-orange-100': item.annotations.color === 'orange_background',
          'bg-yellow-100': item.annotations.color === 'yellow_background',
          'bg-green-100': item.annotations.color === 'green_background',
          'bg-blue-100': item.annotations.color === 'blue_background',
          'bg-purple-100': item.annotations.color === 'purple_background',
          'bg-pink-100': item.annotations.color === 'pink_background',
          'bg-gray-100': item.annotations.color === 'gray_background',
          'bg-amber-100': item.annotations.color === 'brown_background'
        })
        return (
          <li key={key}>
            {item.href ? (
              <Link
                className={className}
                href={item.href}
                target="_blank"
                rel="noopenner noreferrer"
              >
                {item.plain_text}
              </Link>
            ) : (
              <span className={className} key={key}>
                {item.plain_text}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default NumberedListItem
